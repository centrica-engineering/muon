/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Inputter standard default default checks"] = 
`<div
  class="inputter"
  style=""
>
  <slot name="label">
  </slot>
  <div class="wrapper">
    <slot>
    </slot>
  </div>
</div>
`;
/* end snapshot Inputter standard default default checks */

snapshots["Inputter text input mask text default checks"] = 
`<div
  class="has-mask inputter"
  style="--maxlength:4;"
>
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
/* end snapshot Inputter text input mask text default checks */

snapshots["Inputter radio input standard radio default checks"] = 
`<div
  class="inputter radio"
  style=""
>
  <span class="input-heading">
    What is your heating source?
  </span>
  <div class="wrapper">
    <slot>
    </slot>
  </div>
</div>
`;
/* end snapshot Inputter radio input standard radio default checks */

