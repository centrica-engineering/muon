/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["cta implements standard self"] = 
`<div
  aria-label="Buy a doughnut"
  class="cta standard"
>
  <span class="label-holder">
    <slot>
    </slot>
  </span>
  <cta-icon
    class="icon"
    name="arrow-right"
  >
  </cta-icon>
</div>
`;
/* end snapshot cta implements standard self */

snapshots["cta no icon"] = 
`<div
  aria-label="Click me please"
  class="cta standard"
>
  <span class="label-holder">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot cta no icon */

snapshots["cta implements with no icon"] = 
`<div
  aria-label="Click me please"
  class="cta standard"
>
  <span class="label-holder">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot cta implements with no icon */

snapshots["cta implements with loading"] = 
`<span
  aria-live="assertive"
  class="sr-only"
  role="alert"
>
  Loading...
</span>
<div
  aria-label="This is a button"
  class="cta loading standard"
>
  <span class="label-holder">
    Loading...
  </span>
  <cta-icon
    class="icon"
    name="spinner"
  >
  </cta-icon>
</div>
`;
/* end snapshot cta implements with loading */

snapshots["cta implements with icon at start"] = 
`<div
  aria-label="Something something...danger zone"
  class="cta standard"
>
  <span class="label-holder">
    <slot>
    </slot>
  </span>
  <cta-icon
    class="icon"
    name="arrow-right"
  >
  </cta-icon>
</div>
`;
/* end snapshot cta implements with icon at start */

snapshots["cta implements with a href"] = 
`<a
  aria-label="This is a button"
  class="cta standard"
  href="https://example.com"
  tabindex="0"
>
  <span class="label-holder">
    <slot>
    </slot>
  </span>
  <cta-icon
    class="icon"
    name="arrow-right"
  >
  </cta-icon>
</a>
`;
/* end snapshot cta implements with a href */

snapshots["cta implements cta within an anchor element"] = 
`<div
  aria-label="This is a button"
  class="cta standard"
  tabindex="-1"
>
  <span class="label-holder">
    <slot>
    </slot>
  </span>
  <cta-icon
    class="icon"
    name="arrow-right"
  >
  </cta-icon>
</div>
`;
/* end snapshot cta implements cta within an anchor element */

snapshots["cta implements within a form"] = 
`<button
  aria-label="This is a button"
  class="cta standard"
  tabindex="0"
>
  <span class="label-holder">
    <slot>
    </slot>
  </span>
  <cta-icon
    class="icon"
    name="arrow-right"
  >
  </cta-icon>
</button>
`;
/* end snapshot cta implements within a form */

snapshots["cta implements with triggering button"] = 
`<div
  aria-label="This is a button"
  class="cta standard"
>
  <span class="label-holder">
    <slot>
    </slot>
  </span>
  <cta-icon
    class="icon"
    name="arrow-right"
  >
  </cta-icon>
</div>
`;
/* end snapshot cta implements with triggering button */

snapshots["cta implements loading as a button"] = 
`<span
  aria-live="assertive"
  class="sr-only"
  role="alert"
>
  Loading...
</span>
<div
  aria-label="This is a button"
  class="cta loading standard"
>
  <span class="label-holder">
    Loading...
  </span>
  <cta-icon
    class="icon"
    name="spinner"
  >
  </cta-icon>
</div>
`;
/* end snapshot cta implements loading as a button */

