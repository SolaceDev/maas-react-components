# New Components Report (2025-04-08 to 2025-07-08)

## New Components

### SolaceCategorizedSearch

- **File Path**: [`src/components/SolaceCategorizedSearch.tsx`](src/components/SolaceCategorizedSearch.tsx:1)
- **Purpose**: A compound component that combines `SolaceToggleButtonGroup` and `SolaceSearchAndFilter` to allow users to switch between different categories and then search within the selected category.
- **PR**: [#1036](https://github.com/SolaceDev/maas-react-components/pull/1036)
- **Props**:
  - `id?`: `string`
  - `name`: `string`
  - `categoryOptions?`: `SolaceToggleButtonGroupOptionProps[]`
  - `categoryOptionsWidth?`: `string`
  - `selectedCategoryValue?`: `string`
  - `onCategoryChange`: `(event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => void`
  - `helperText?`: `string | JSX.Element`
  - `searchValue?`: `string`
  - `placeholder?`: `string`
  - `searchInputWidth?`: `string`
  - `disabled?`: `boolean`
  - `autoFocus?`: `boolean`
  - `hasErrors?`: `boolean`
  - `onSearchValueChange`: `(event: SolaceTextFieldChangeEvent) => void`
  - `onSearchInputFocus?`: `(event: React.FocusEvent<HTMLInputElement>) => void`
  - `onSearchInputBlur?`: `(event: React.FocusEvent<HTMLInputElement>) => void`
  - `onClearAll?`: `() => void`
  - `layout?`: `SolaceCategorizedSearchLayout`
  - `equalButtonWidth?`: `boolean`
  - `dataQa?`: `string`

### SolaceLearningBanner

- **File Path**: [`src/components/SolaceLearningBanner.tsx`](src/components/SolaceLearningBanner.tsx:1)
- **Purpose**: A banner-style component with a title and close button.
- **PR**: [#1047](https://github.com/SolaceDev/maas-react-components/pull/1047)
- **Props**:
  - `title?`: `string | JSX.Element`
  - `children`: `JSX.Element`
  - `showCloseButton?`: `boolean`
  - `onClose?`: `() => void`
  - `backgroundColor?`: `string`
  - `dataQa?`: `string`
  - `dataTags?`: `string`

### SolaceChipTextArea

- **File Path**: [`src/components/form/SolaceChipTextArea/SolaceChipTextArea.tsx`](src/components/form/SolaceChipTextArea/SolaceChipTextArea.tsx:1)
- **Purpose**: An experimental component that allows for entering text that gets converted into chips. It supports typing in values separated by comma, semicolon, space and enter button, and pasting from the clipboard. It also has an optional validation function property.
- **PR**: [#1041](https://github.com/SolaceDev/maas-react-components/pull/1041)
- **Props**:
  - `id?`: `string`
  - `name`: `string`
  - `label?`: `string | JSX.Element`
  - `value?`: `string`
  - `helperText?`: `string | JSX.Element`
  - `maxLength?`: `number`
  - `title?`: `string`
  - `autoFocus?`: `boolean`
  - `hasErrors?`: `boolean`
  - `required?`: `boolean`
  - `inlineLabel?`: `boolean`
  - `onChange?`: `(event: SolaceChipTextAreaChangeEvent) => void`
  - `onBlur?`: `(event: React.FocusEvent<HTMLInputElement>) => void`
  - `onKeyDown?`: `(event: React.KeyboardEvent<HTMLInputElement>) => void`
  - `onKeyUp?`: `(event: React.KeyboardEvent<HTMLInputElement>) => void`
  - `onFocus?`: `(event: React.FocusEvent<HTMLInputElement>) => void`
  - `width?`: `string`
  - `validateChip?`: `(text: string) => string | undefined`

## Summary

- **Total New Components**: 3
