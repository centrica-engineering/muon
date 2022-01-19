/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["detail standard"] = 
`<details class="details">
  <summary class="heading">
    <slot name="heading">
    </slot>
    <detail-icon
      class="toggle"
      name=""
    >
    </detail-icon>
  </summary>
  <div class="content">
    <slot>
    </slot>
  </div>
</details>
`;
/* end snapshot detail standard */

snapshots["detail standard open"] = 
`<details
  class="details"
  open=""
>
  <summary class="heading">
    <slot name="heading">
    </slot>
    <detail-icon
      class="toggle"
      name=""
    >
    </detail-icon>
  </summary>
  <div class="content">
    <slot>
    </slot>
  </div>
</details>
`;
/* end snapshot detail standard open */

snapshots["detail standard heading"] = 
`<details class="details">
  <summary class="heading">
    <span class="heading">
      <slot name="heading">
      </slot>
    </span>
    <detail-icon
      class="open-icon"
      name="chevron-circle-down"
    >
    </detail-icon>
    <detail-icon
      class="close-icon"
      name="chevron-circle-up"
    >
    </detail-icon>
  </summary>
  <div class="content">
    <slot>
    </slot>
  </div>
</details>
`;
/* end snapshot detail standard heading */

snapshots["detail standard slotted content"] = 
`<details class="details">
  <summary class="heading">
    <slot name="heading">
    </slot>
    <detail-icon
      class="toggle"
      name=""
    >
    </detail-icon>
  </summary>
  <div class="content">
    <slot>
    </slot>
  </div>
</details>
`;
/* end snapshot detail standard slotted content */

snapshots["detail standard toggle event"] = 
`<details class="details">
  <summary class="heading">
    <span class="heading">
      <slot name="heading">
      </slot>
    </span>
    <detail-icon
      class="open-icon"
      name="chevron-circle-down"
    >
    </detail-icon>
    <detail-icon
      class="close-icon"
      name="chevron-circle-up"
    >
    </detail-icon>
  </summary>
  <div class="content">
    <slot>
    </slot>
  </div>
</details>
`;
/* end snapshot detail standard toggle event */

snapshots["detail standard toggle event true"] = 
`<details class="details">
  <summary class="heading">
    <slot name="heading">
    </slot>
    <detail-icon
      class="toggle"
      name=""
    >
    </detail-icon>
  </summary>
  <div class="content">
    <slot>
    </slot>
  </div>
</details>
`;
/* end snapshot detail standard toggle event true */

snapshots["detail standard toggle event false"] = 
`<details
  class="details toggle-start"
  open=""
>
  <summary class="heading">
    <detail-icon
      class="toggle"
      name="chevron-circle-up"
    >
    </detail-icon>
    <slot name="heading">
    </slot>
  </summary>
  <div class="content">
    <slot>
    </slot>
  </div>
</details>
`;
/* end snapshot detail standard toggle event false */

snapshots["detail standard icon"] = 
`<details class="details toggle-start">
  <summary class="heading">
    <detail-icon
      class="toggle"
      name="chevron-circle-down"
    >
    </detail-icon>
    <slot name="heading">
    </slot>
  </summary>
  <div class="content">
    <slot>
    </slot>
  </div>
</details>
`;
/* end snapshot detail standard icon */

snapshots["detail standard icon end"] = 
`<details class="details toggle-end">
  <summary class="heading">
    <slot name="heading">
    </slot>
    <detail-icon
      class="toggle"
      name="chevron-circle-down"
    >
    </detail-icon>
  </summary>
  <div class="content">
    <slot>
    </slot>
  </div>
</details>
`;
/* end snapshot detail standard icon end */

snapshots["detail standard toggle"] = 
`<details class="details toggle-start">
  <summary class="heading">
    <detail-icon
      class="toggle"
      name="chevron-circle-down"
    >
    </detail-icon>
    <slot name="heading">
    </slot>
    <detail-icon
      class="icon"
      name=""
    >
    </detail-icon>
  </summary>
  <div class="content">
    <slot>
    </slot>
  </div>
</details>
`;
/* end snapshot detail standard toggle */

snapshots["detail standard toggle end"] = 
`<details class="details toggle-end">
  <summary class="heading">
    <detail-icon
      class="icon"
      name=""
    >
    </detail-icon>
    <slot name="heading">
    </slot>
    <detail-icon
      class="toggle"
      name="chevron-circle-down"
    >
    </detail-icon>
  </summary>
  <div class="content">
    <slot>
    </slot>
  </div>
</details>
`;
/* end snapshot detail standard toggle end */

