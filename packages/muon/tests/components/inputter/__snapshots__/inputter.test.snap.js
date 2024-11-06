/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Inputter standard default"] = 
`<div class="inputter">
  <slot name="label">
  </slot>
  <div class="wrapper">
    <slot>
    </slot>
  </div>
</div>
`;
/* end snapshot Inputter standard default */

snapshots["Inputter helper text"] = 
`<div class="inputter type-text">
  <slot name="label">
  </slot>
  <div class="helper">
    What is this?
  </div>
  <div class="wrapper">
    <slot>
    </slot>
  </div>
</div>
`;
/* end snapshot Inputter helper text */

snapshots["Inputter helper detail"] = 
`<div class="inputter type-text">
  <slot name="label">
  </slot>
  <inputter-detail>
    <div slot="heading">
      What is this?
    </div>
    <slot name="tip-details">
    </slot>
  </inputter-detail>
  <div class="wrapper">
    <slot>
    </slot>
  </div>
</div>
`;
/* end snapshot Inputter helper detail */

snapshots["Inputter helper detail open"] = 
`<div class="inputter type-text">
  <slot name="label">
  </slot>
  <inputter-detail open="">
    <div slot="heading">
      What is this?
    </div>
    <slot name="tip-details">
    </slot>
  </inputter-detail>
  <div class="wrapper">
    <slot>
    </slot>
  </div>
</div>
`;
/* end snapshot Inputter helper detail open */

snapshots["Inputter text disabled"] = 
`<div class="has-disabled inputter type-text">
  <slot name="label">
  </slot>
  <div class="wrapper">
    <slot>
    </slot>
  </div>
</div>
`;
/* end snapshot Inputter text disabled */

snapshots["Inputter text mask text"] = 
`<div class="has-mask inputter type-text">
  <slot name="label">
  </slot>
  <div class="wrapper">
    <slot>
    </slot>
    <div
      aria-hidden="true"
      class="input-mask"
    >
      0000
    </div>
  </div>
</div>
`;
/* end snapshot Inputter text mask text */

snapshots["Inputter text validation on input"] = 
`<div class="inputter type-text">
  <slot name="label">
  </slot>
  <div class="wrapper">
    <slot>
    </slot>
  </div>
</div>
`;
/* end snapshot Inputter text validation on input */

snapshots["Inputter text validation on change"] = 
`<div class="inputter type-text">
  <slot name="label">
  </slot>
  <div class="wrapper">
    <slot>
    </slot>
  </div>
</div>
`;
/* end snapshot Inputter text validation on change */

snapshots["Inputter text mask & validation"] = 
`<div class="has-mask inputter type-text">
  <slot name="label">
  </slot>
  <div class="wrapper">
    <slot>
    </slot>
    <div
      aria-hidden="true"
      class="input-mask"
    >
      0000
    </div>
  </div>
</div>
`;
/* end snapshot Inputter text mask & validation */

snapshots["Inputter radio standard radio"] = 
`<div class="inputter radio">
  <fieldset>
    <legend>
      <span class="input-heading">
        What is your heating source?
      </span>
    </legend>
    <div class="wrapper">
      <slot>
      </slot>
    </div>
  </fieldset>
</div>
`;
/* end snapshot Inputter radio standard radio */

snapshots["Inputter radio radio mask"] = 
`<div class="has-mask inputter radio">
  <fieldset>
    <legend>
      <span class="input-heading">
        What is your heating source?
      </span>
    </legend>
    <div class="wrapper">
      <slot>
      </slot>
    </div>
  </fieldset>
</div>
`;
/* end snapshot Inputter radio radio mask */

snapshots["Inputter radio radio mask validation"] = 
`<div class="has-mask inputter radio">
  <fieldset>
    <legend>
      <span class="input-heading">
        What is your heating source?
      </span>
    </legend>
    <div class="wrapper">
      <slot>
      </slot>
    </div>
  </fieldset>
</div>
`;
/* end snapshot Inputter radio radio mask validation */

snapshots["Inputter select standard select"] = 
`<div class="inputter select">
  <slot name="label">
  </slot>
  <div class="wrapper">
    <slot>
    </slot>
    <inputter-icon name="chevron-circle-down">
    </inputter-icon>
  </div>
</div>
`;
/* end snapshot Inputter select standard select */

snapshots["Inputter search standard search"] = 
`<div class="inputter search type-search">
  <slot name="label">
  </slot>
  <div class="wrapper">
    <slot>
    </slot>
    <inputter-icon name="search">
    </inputter-icon>
  </div>
</div>
`;
/* end snapshot Inputter search standard search */

snapshots["Inputter date standard date"] = 
`<div class="date inputter type-date">
  <slot name="label">
  </slot>
  <div class="wrapper">
    <slot>
    </slot>
    <inputter-icon name="calendar">
    </inputter-icon>
  </div>
</div>
`;
/* end snapshot Inputter date standard date */

snapshots["Inputter text mask & separator text"] = 
`<div class="has-mask inputter type-text">
  <slot name="label">
  </slot>
  <div class="wrapper">
    <slot>
    </slot>
    <div
      aria-hidden="true"
      class="input-mask"
    >
      00-00
    </div>
  </div>
</div>
`;
/* end snapshot Inputter text mask & separator text */

