# Clamp generator

![Index image screenshots](screenshots/index-20240927.png?)

Simple clamp generator source code made with vanilla JS and bootstrap.

## Introduction

The Clamp Generator is a tool that helps developers generate responsive `font-size` CSS code using the `clamp()` function. It allows you to specify minimum and maximum font sizes and screen widths, and generates the corresponding CSS code that scales the font size responsively between those values.

## Features

- **Responsive Font Sizes**: Generate `font-size` values that adjust according to the viewport width.
- **Easy to Use Interface**: Simple input fields for font sizes and screen widths.
- **Real-Time Updates**: Instant calculation and display of the clamp CSS code as you change input values.
- **Reverse Calculation**: Determine the minimum and maximum screen widths from existing clamp values.
- **Vanilla JavaScript**: No dependencies on frameworks, making it lightweight and easy to integrate.
- **Bootstrap Styling**: Clean and responsive UI using Bootstrap.

## Usage

1. **Enter Font Sizes**:
   - Minimum Font Size: The smallest font size in `rem` units.
   - Maximum Font Size: The largest font size in `rem` units.
2. **Enter Screen Widths**:
   - Minimum Screen Width: The viewport width (in pixels) where the font size should be at its minimum.
   - Maximum Screen Width: The viewport width (in pixels) where the font size should reach its maximum.
3. **View Generated Code**:
   - The CSS `clamp()` code will be automatically generated and displayed as you adjust the inputs.
4. **Reverse Calculation**:
   - Click on "Reverse Clamp Calculation" to determine the minimum and maximum screen widths based on the current clamp values.
5. **Copy the Code**:
   - Use the generated code in your CSS files to implement responsive font sizes.

## How It Works

The clamp generator calculates the responsive `font-size` using the following formula:

```css
font-size: clamp(min-font-size, calc(y-intercept + slope * viewport-width), max-font-size);
```

- **Slope** (`slopeVW`): The rate at which the font size increases relative to the viewport width.
- **Y-Intercept** (`yIntercept`): The starting point of the font size calculation when the viewport width is zero.

The tool performs these calculations behind the scenes and provides you with the exact code to use in your stylesheets.
