### Anatomy of the component
The muon-cta (call to action) component comprises text, a functional icon, and a background by default.

![Anatomy of the CTA](/images/cta/cta-anatomy.png)

---

### Scale

[Fitts' law](https://lawsofux.com/fittss-law/) can be applied to understand that touch-targets such as the `muon-cta` should be large enough for users to accurately select them, have ample spacing between them, and be positioned in an area of the UI that allows them to be easily used. That is, the distance between a user's task/attention area and the task-related button should be kept as short as possible.

Fast movements and small targets = increased errors. We should look to prevent errors.

### Accessibility

The minimal target size recommended by WCAG 2.1 is 44px sq for a touch device. The `muon-cta` meets this requirement.

Ref: <https://www.w3.org/WAI/WCAG21/Understanding/target-size.html>

---

### Interactive states

There are a number of states for the `muon-cta` that provide feedback to the user when interacting with it.

These are:

#### Default

The 'up' state that users first see.


![Default state](https://user-images.githubusercontent.com/78355810/144259103-8900ea42-9741-4b76-9778-7195fdef08d5.png)

#### Hover

The 'over' state that is seen when a mouse's cursor is over the target area.

![Active state](https://user-images.githubusercontent.com/78355810/144259101-979bdb19-19ae-4f26-a9b5-32ba6a874280.png)

#### Active

The 'pressed' state is momentarily seen on click/tap.


![Active state](https://user-images.githubusercontent.com/78355810/144259099-35ca6ee9-2564-4cb7-8625-855015648ec5.png)

#### Focus

The highlighted state see when a user navigates by tabbing through on the keyboard to the CTA component.

![Focus state](https://user-images.githubusercontent.com/78355810/144259100-d6cc68a5-174d-4ff3-8981-8f579ddb75e6.png)

#### Loading

The loading state is visually different – in contrast to the other states, it also contains animation to convey the meaning that something is in progress.

![Loading state](https://user-images.githubusercontent.com/78355810/144259088-355b1432-ed13-4f41-bd13-e8b7d8141580.png)

### Disabled

The disabled state reduces the contrast and removes the click functionality of the `muon-cta`.

_**Accessibility note:** this state does not need to meet colour contrast ratios. The W3C states:
“1.4.3 Contrast (Minimum): The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for the following:
Large Text: Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;
Incidental: Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement._

![Disabled state](https://user-images.githubusercontent.com/78355810/144259095-ae1a9d02-0f5b-4817-bec6-b9005165967e.png)

---

## Accessible use of contrast

Ensure that colours used meet or exceed WCAG AA standard for the size of text used, against its background colour.

![Disabled state](https://user-images.githubusercontent.com/78355810/177174311-056405b6-0985-411b-8a5f-1da399db4cec.png)

Note: AA result is for 16px text, AAA is at least 18.66px with bold weight or 24px regular.

---

## Content

The `muon-cta` component contains a link to another location (href string).

Bi-directional text and icon position accommodates i18n (internationalisation) where some languages are read right to left.

![Bi-directional text and icon](/images/cta/cta-bidriectional.png)

The loading message default text is the token (which has a default value of "Loading...") and overwrites the CTA anonymous slot (the original CTA text) when active.

![Loading state](/images/cta/cta-loading.png)

Tone of voice - text should clearly describe what the action is eg. "Get a quote" and not "Click here". The the tense changes relevant to loading state, "Get a quote" becomes "Getting quote...".

![Loading state - Tone of voice](/images/cta/cta-tov.png)

Length should be short, relevant and actionable. No longer than 24 characters.

---

## Behaviour

In addition to the different states changing, if the CTA is long (up to 24 characters) and the `muon-cta` component is within a confined space, then the text may wrap, expanding the background downwards but still hugging the content and maintaining padding and space between text and icon. It should align to the middle vertically, and the icon too.

Focus sequence should be considered for those navigating with a keyboard (tabbing).

---

## Best practice

A call-to-action allows users to take action once they are ready for it. It should always be clear to the user what the CTA's action is through text.

### Do

- Keep the text ‘short, relevant, and actionable’. It should not exceed more than 24 characters.
- use `loading` to stop a user from multi clicks and to indicate that something is happening
- Relate the action to the content it sits beside.
- Minimise choices when response times are critical. [Hick's Law](https://lawsofux.com/hicks-law/)
- Loading message should be the action of the text of the CTA eg. "Get a quote" becomes "Getting your quote...".

### Don't

- Make it vague
- Make it overly wordy
- Use icons that are irrelevant to the action
- Use more than 24 characters
- Repeat CTA copy within the same page
- Use multiple CTAs together (can cause analysis paralysis and dilutes impact)

---
