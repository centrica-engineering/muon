### Purpose

A CTA (call-to-action) allows users to interact with it and take action once they are ready for it. It signposts what to do next.

It should always be clear to the user what the CTA's action is via the text.



### Anatomy of the component

<img width="748" alt="Screenshot 2022-07-27 at 15 57 32" src="https://user-images.githubusercontent.com/78355810/181280395-1747b2f7-f5ad-4528-88df-f51242f1e800.png">

There are 2 templates - primary and secondary. The default primary version comprises a rounded corner rectangle with coloured background, 'reversed out' text, and the option of using an icon at either the start or end.

<img width="749" alt="Screenshot 2022-06-27 at 12 03 17" src="https://user-images.githubusercontent.com/78355810/175927225-aa60963d-2ef1-421e-a736-62c2405f6144.png">

The default secondary version is similar but uses positive link colour for the text without using a background (although that could be an option at brand level) and has less visual dominance to show the hierarchy of importance. (The principle of hierarchy should be retained throughout brand level too).

<img width="748" alt="Screenshot 2022-06-27 at 12 03 25" src="https://user-images.githubusercontent.com/78355810/175927263-3eb86df0-11db-49de-b8b5-137e2eeeba39.png">

Example of how the form of a secondary cta could be different as required by a brand.

<img width="747" alt="Screenshot 2022-06-27 at 12 05 20" src="https://user-images.githubusercontent.com/78355810/175927522-dbbf0310-ad40-40e0-ac1c-34d0a89d2e4f.png">


---

### Reusable elements from Foundations

Reusable elements from [Foundations](../baseline-guide/foundations.md):

- Typography
- Iconography
- Colours
- Line
- Shape
- Spacers
- Context

---

### Scale

[Fitts' law](https://lawsofux.com/fittss-law/) can be applied to understand that touch-targets such as the ```cta``` should be large enough for users to accurately select them, have ample spacing between them, and be positioned in an area of the UI that allows them to be easily used. That is, the distance between a user's task/attention area and the task-related button should be kept as short as possible.

Fast movements and small targets = increased errors. We should look to prevent errors.

### Accessibility

The minimal target size recommended by WCAG 2.1 is 44px sq for a touch device. The ```cta``` meets this requirement.

Ref: <https://www.w3.org/WAI/WCAG21/Understanding/target-size.html>

---

### Interactive states

There are a number of states for the ```cta``` that provide feedback to the user when interacting with it.

These are:

#### Default

The 'up' state that users first see.

<img width="748" alt="Screenshot 2022-06-27 at 11 56 00" src="https://user-images.githubusercontent.com/78355810/144259103-8900ea42-9741-4b76-9778-7195fdef08d5.png">

#### Hover

The 'over' state that is seen when a mouse's cursor is over the target area.

<img width="748" alt="Screenshot 2022-06-27 at 11 56 13" src="https://user-images.githubusercontent.com/78355810/144259101-979bdb19-19ae-4f26-a9b5-32ba6a874280.png">

#### Active

The 'pressed' state is momentarily seen on click/tap.

<img width="747" alt="Screenshot 2022-06-27 at 11 56 24" src="https://user-images.githubusercontent.com/78355810/144259099-35ca6ee9-2564-4cb7-8625-855015648ec5.png">

#### Focus

The highlighted state see when a user navigates by tabbing through on the keyboard to the CTA component.

<img width="749" alt="Screenshot 2022-06-27 at 11 56 37" src="https://user-images.githubusercontent.com/78355810/144259100-d6cc68a5-174d-4ff3-8981-8f579ddb75e6.png">

#### Loading

The loading state is visually different – in contrast to the other states, it also contains animation to convey the meaning that something is in progress.

<img width="746" alt="Screenshot 2022-06-27 at 11 56 47" src="https://user-images.githubusercontent.com/78355810/144259088-355b1432-ed13-4f41-bd13-e8b7d8141580.png">

### Disabled

The disabled state reduces the contrast and removes the click functionality of the ```cta```. 

_**Accessibility note:** this state does not need to meet colour contrast ratios. The W3C states:
“1.4.3 Contrast (Minimum): The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for the following:
Large Text: Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;
Incidental: Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement._
<img width="746" alt="Screenshot 2022-06-27 at 11 56 47" src="https://user-images.githubusercontent.com/78355810/144259095-ae1a9d02-0f5b-4817-bec6-b9005165967e.png">


---

## Accessible use of contrast

Ensure that colours used meet or exceed WCAG AA standard for the size of text used, against it's background colour. 

<img width="747" alt="Screenshot 2022-07-04 at 15 24 41" src="https://user-images.githubusercontent.com/78355810/177174311-056405b6-0985-411b-8a5f-1da399db4cec.png">

Note: AA result is for 16px text, AAA is at least 18.66px with bold weight or 24px regular.

---

## Content

The ```cta``` component contains a link to another location (href string).



<img width="555" alt="Screenshot 2022-07-05 at 12 06 21" src="https://user-images.githubusercontent.com/78355810/177314258-1b099114-e1eb-493a-919a-6feec39e9bef.png">

Bi-directional text and icon position accommodates i18n (internationalisation) where some languages are read right to left.

Loading message is 'false' by default but state can be changed using 'true'. The message default is "Loading..." And overwrites the CTA anonymous slot (the original CTA text) when active.

Tone of voice - text should clearly describe what the action is eg. "Get a quote" and not "Click here". The the tense changes relevant to loading state, "Get a quote" becomes "Getting quote...".

<img width="555" alt="Screenshot 2022-07-05 at 12 10 27" src="https://user-images.githubusercontent.com/78355810/177314855-bdd83328-8c11-4dfa-b472-205107a035e7.png">

Length should be short, relevant and actionable. No longer than 24 characters.

---

## Behaviour

In addition to the different states changing, if the CTA is long (up to 24 characters) and the ```cta``` component is within a confined space, then the text may wrap, expanding the background downwards but still hugging the content and maintaining padding and space between text and icon. It should align to the middle vertically, and the icon too.

Motion (such as that on the loading icon by default) should be minimal and subtle so as not to cause distraction or nausea amongst other reactions from animations.

People with vestibular disorders need control over movement triggered by interactions. Refer to [WCAG 2.1 - Understanding Success Criterion 2.3.3: Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html#:~:text=Success%20Criterion%202.3.-,3%3A%20Animation%20from%20Interactions,or%20the%20information%20being%20conveyed.) for more on this...

Focus sequence should be considered for those navigating with a keyboard (tabbing).

---

## Best practice

A call-to-action allows users to take action once they are ready for it. We allow users to perform certain actions through the use of our call to actions (CTAs). It should always be clear to the user what the CTA's action is through text.

### Do

- Keep the text ‘short, relevant, and actionable’. It should not exceed more than 24 characters.
- Only use 'loading' on an action.
- Relate the action to the content it sits beside.
- Use the primary version for the most important action on a page.
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
