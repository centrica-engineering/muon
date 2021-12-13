/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["detail standard"] = 
`<details class="details">
  <summary class="summary">
    <span class="heading-wrapper">
      <slot name="heading">
      </slot>
      <detail-icon
        class="toggle-icon"
        name=""
      >
      </detail-icon>
    </span>
  </summary>
  <div class="panel">
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
  <summary class="summary">
    <span class="heading-wrapper">
      <slot name="heading">
      </slot>
      <detail-icon
        class="toggle-icon"
        name=""
      >
      </detail-icon>
    </span>
  </summary>
  <div class="panel">
    <slot>
    </slot>
  </div>
</details>
`;
/* end snapshot detail standard open */

snapshots["detail standard heading"] = 
`<details class="details">
  <summary class="summary">
    <span class="heading-wrapper">
      <span class="heading">
        <slot name="heading">
        </slot>
      </span>
      <span class="open-close-icon">
        <detail-icon
          class="open-icon"
          name="chevron-down"
        >
        </detail-icon>
        <detail-icon
          class="close-icon"
          name="chevron-up"
        >
        </detail-icon>
      </span>
    </span>
  </summary>
  <div class="panel">
    <slot>
    </slot>
  </div>
</details>
`;
/* end snapshot detail standard heading */

snapshots["detail standard slotted content"] = 
`<details class="details">
  <summary class="summary">
    <span class="heading-wrapper">
      <slot name="heading">
      </slot>
      <detail-icon
        class="toggle-icon"
        name=""
      >
      </detail-icon>
    </span>
  </summary>
  <div class="panel">
    <slot>
    </slot>
  </div>
</details>
`;
/* end snapshot detail standard slotted content */

snapshots["detail standard toggle event"] = 
`<details class="details">
  <summary class="summary">
    <span class="heading-wrapper">
      <span class="heading">
        <slot name="heading">
        </slot>
      </span>
      <span class="open-close-icon">
        <detail-icon
          class="open-icon"
          name="chevron-down"
        >
        </detail-icon>
        <detail-icon
          class="close-icon"
          name="chevron-up"
        >
        </detail-icon>
      </span>
    </span>
  </summary>
  <div class="panel">
    <slot>
    </slot>
  </div>
</details>
`;
/* end snapshot detail standard toggle event */

snapshots["detail standard toggle event true"] = 
`<details class="details">
  <summary class="summary">
    <span class="heading-wrapper">
      <slot name="heading">
      </slot>
      <detail-icon
        class="toggle-icon"
        name=""
      >
      </detail-icon>
    </span>
  </summary>
  <div class="panel">
    <slot>
    </slot>
  </div>
</details>
`;
/* end snapshot detail standard toggle event true */

snapshots["detail standard toggle event false"] = 
`<details
  class="details"
  open=""
>
  <summary class="summary">
    <span class="heading-wrapper">
      <slot name="heading">
      </slot>
      <detail-icon
        class="toggle-icon"
        name=""
      >
      </detail-icon>
    </span>
  </summary>
  <div class="panel">
    <slot>
    </slot>
  </div>
</details>
`;
/* end snapshot detail standard toggle event false */

snapshots["detail standard icon"] = 
`<details class="details tg-icon-start">
  <summary class="summary">
    <span class="heading-wrapper">
      <detail-icon
        class="toggle-icon"
        name="chevron-down"
      >
      </detail-icon>
      <slot name="heading">
      </slot>
    </span>
  </summary>
  <div class="panel">
    <slot>
    </slot>
  </div>
</details>
`;
/* end snapshot detail standard icon */

snapshots["detail standard icon end"] = 
`<details class="details tg-icon-end">
  <summary class="summary">
    <span class="heading-wrapper">
      <slot name="heading">
      </slot>
      <detail-icon
        class="toggle-icon"
        name="chevron-down"
      >
      </detail-icon>
    </span>
  </summary>
  <div class="panel">
    <slot>
    </slot>
  </div>
</details>
`;
/* end snapshot detail standard icon end */

