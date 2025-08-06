import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getComponentUsageAll } from "../getComponentUsageAll";
import { getComponentUsageByApplication } from "../getComponentUsageByApplication";
import { Instance } from "../../utils/keyTransformer";

jest.mock("../getComponentUsageByApplication");

const mockAxios = new MockAdapter(axios);
const mockedGetUsageByApp = getComponentUsageByApplication as jest.Mock;

describe("getComponentUsageAll", () => {
	const componentName = "SolaceButton";
	const baseUrl =
		"https://api.github.com/repos/SolaceDev/maas-react-components/contents/mrc-usage-report-data/per-application";
	const ref = "feature/mrc-usage-report-data";
	const url = `${baseUrl}?ref=${ref}`;
	const app1 = "maas-ui";
	const app2 = "maas-ops-ui";
	const app3 = "broker-manager";

	beforeEach(() => {
		mockAxios.reset();
		mockedGetUsageByApp.mockClear();
	});

	afterEach(() => {
		delete process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
	});

	it("should fetch and aggregate component usage from all applications", async () => {
		const mockAppDirs = [
			{ type: "dir", name: app1 },
			{ type: "dir", name: app2 }
		];

		const mockInstancesApp1: Instance[] = [
			{
				filePath: "/path/to/file1",
				props: [{ name: "variant", value: "primary", type: "string" }]
			}
		];
		const mockInstancesApp2: Instance[] = [
			{
				filePath: "/path/to/file2",
				props: [{ name: "variant", value: "secondary", type: "string" }]
			}
		];

		mockAxios.onGet(url).reply((config) => {
			expect(config.headers?.Authorization).toBe(`Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`);
			return [200, mockAppDirs];
		});
		mockedGetUsageByApp.mockImplementation(async (appName: string) => {
			if (appName === app1) {
				return Promise.resolve(mockInstancesApp1);
			}
			if (appName === app2) {
				return Promise.resolve(mockInstancesApp2);
			}
			return Promise.resolve([]);
		});

		const result = await getComponentUsageAll(componentName);

		expect(result).toHaveLength(2);
		expect(result).toEqual([...mockInstancesApp1, ...mockInstancesApp2]);
		expect(mockedGetUsageByApp).toHaveBeenCalledWith(app1, componentName);
		expect(mockedGetUsageByApp).toHaveBeenCalledWith(app2, componentName);
	});

	it("should return an empty array when no applications are found", async () => {
		mockAxios.onGet(url).reply(200, []);
		const result = await getComponentUsageAll(componentName);
		expect(result).toEqual([]);
		expect(mockedGetUsageByApp).not.toHaveBeenCalled();
	});

	it("should throw an error if GITHUB_PERSONAL_ACCESS_TOKEN is not set", async () => {
		delete process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
		await expect(getComponentUsageAll(componentName)).rejects.toThrow(
			"GitHub Personal Access Token is not configured. Please set GITHUB_PERSONAL_ACCESS_TOKEN environment variable."
		);
	});

	it("should handle errors when fetching application directories", async () => {
		mockAxios.onGet(url).reply(500);
		await expect(getComponentUsageAll(componentName)).rejects.toThrow("Could not fetch directory contents from GitHub");
	});

	it("should handle errors within getComponentUsageByApplication and continue processing other applications", async () => {
		const mockAppDirs = [
			{ type: "dir", name: app1 },
			{ type: "dir", name: app2 },
			{ type: "dir", name: app3 }
		];
		const mockInstancesApp2: Instance[] = [
			{
				filePath: "/path/to/file2",
				props: [{ name: "variant", value: "secondary", type: "string" }]
			}
		];

		mockAxios.onGet(url).reply(200, mockAppDirs);
		mockedGetUsageByApp.mockImplementation(async (appName: string) => {
			if (appName === app1) {
				throw new Error(`Failed to fetch usage for ${app1}`);
			}
			if (appName === app2) {
				return Promise.resolve(mockInstancesApp2);
			}
			return Promise.resolve([]);
		});

		const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
		const result = await getComponentUsageAll(componentName);

		expect(result).toHaveLength(1);
		expect(result).toEqual(mockInstancesApp2);
		expect(mockedGetUsageByApp).toHaveBeenCalledWith(app1, componentName);
		expect(mockedGetUsageByApp).toHaveBeenCalledWith(app2, componentName);
		expect(mockedGetUsageByApp).toHaveBeenCalledWith(app3, componentName);
		expect(consoleErrorSpy).toHaveBeenCalledWith(
			`[ERROR] Failed to get usage for component ${componentName} in application ${app1}:`,
			expect.any(Error)
		);
		consoleErrorSpy.mockRestore();
	});
});
