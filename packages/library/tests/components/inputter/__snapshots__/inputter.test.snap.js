/* @web/test-runner snapshot v1 */
export const snapshots = {};
snapshots["Inputter standard default default checks"] = 
`<div
  class="slotted-content"
  style=""
>
  <slot name="label">
  </slot>
  <div class="input-holder">
    <slot>
    </slot>
  </div>
</div>
`;
/* end snapshot Inputter standard default default checks */

snapshots["Inputter helper default checks"] = 
`<div class="slotted-content">
  <slot name="label">
  </slot>
  <div class="helper">
    What is this?
  </div>
  <div class="input-holder">
    <slot>
    </slot>
  </div>
</div>
`;
/* end snapshot Inputter helper default checks */

snapshots["Inputter helper detail default checks"] = 
`<div class="slotted-content">
  <slot name="label">
  </slot>
  <inputter-detail>
    <div slot="heading">
      What is this?
    </div>
    <slot name="tip-details">
    </slot>
  </inputter-detail>
  <div class="input-holder">
    <slot>
    </slot>
  </div>
</div>
`;
/* end snapshot Inputter helper detail default checks */

snapshots["Inputter helper detail open default checks"] = 
`<div class="slotted-content">
  <slot name="label">
  </slot>
  <inputter-detail open="">
    <div slot="heading">
      What is this?
    </div>
    <slot name="tip-details">
    </slot>
  </inputter-detail>
  <div class="input-holder">
    <slot>
    </slot>
  </div>
</div>
`;
/* end snapshot Inputter helper detail open default checks */

snapshots["Inputter text mask text default checks"] = 
`<div
  class="has-mask slotted-content"
  style="--maxlength:4;"
>
  <slot name="label">
  </slot>
  <div class="input-holder">
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
/* end snapshot Inputter text mask text default checks */

snapshots["Inputter text validation default checks"] = 
`<div class="slotted-content">
  <slot name="label">
  </slot>
  <div class="input-holder">
    <slot>
    </slot>
  </div>
</div>
`;
/* end snapshot Inputter text validation default checks */

snapshots["Inputter radio standard radio default checks"] = 
`<div
  class="slotted-content"
  style=""
>
  <span class="input-heading">
    What is your heating source?
  </span>
  <div class="input-holder">
    <slot>
    </slot>
  </div>
</div>
`;
/* end snapshot Inputter radio standard radio default checks */
