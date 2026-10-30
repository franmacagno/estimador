# House Cost Estimator

Create a simple landing page for a web app that helps users estimate the cost of building a house.

The landing page should feel modern, clean and minimal.

Main goal: encourage users to calculate the estimated cost of their future house.

Sections of the page:

HERO SECTION
Title: "Calculate the cost of building your house"

Subtitle: "Configure your house in 2 minutes and get an estimated construction cost."

Primary CTA button: "Start calculating"

CALCULATOR SECTION

When the user clicks the CTA, show a simple calculator form with the following inputs:

Location (text input)

Square meters of the house (number input)

Construction type (dropdown: Traditional / Steel Frame)

Finishing level (dropdown: Basic / Standard / Premium)

Number of bedrooms (dropdown: 1 / 2 / 3 / 4+)

Add a "Calculate cost" button.

RESULT SECTION

After clicking calculate, show an estimated result:

Display:

Estimated house size
Estimated price per m²
Estimated total cost

Example layout:

"Estimated construction cost"

House size: 120 m²
Estimated price: $750 / m²
Total estimated cost: $90,000

Also show two buttons:

"Compare architects"
"Download estimate"

DESIGN

Use a modern SaaS landing style:

large hero

centered calculator

clean UI

neutral colors

rounded inputs

clear typography

Keep the UI simple and intuitive.

TECH

Use simple logic for the calculation:

Base price per m²: 750 USD

If Steel Frame → 700 USD/m²
If Premium finishes → increase price by 20%
If Basic finishes → decrease price by 10%

Total cost = square meters × adjusted price per m²

This is just an estimation calculator for MVP purposes.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/98555d55-66b1-4496-871b-a92fe8abee32).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
