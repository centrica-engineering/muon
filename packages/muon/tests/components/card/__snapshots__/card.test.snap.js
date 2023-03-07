/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["card default"] = 
`<div
  class="card"
  style=""
>
  <div class="body">
    <div class="header">
      <slot name="header">
      </slot>
    </div>
    <div class="content">
      <slot>
      </slot>
    </div>
    <div class="footer">
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>
`;
/* end snapshot card default */

snapshots["card standard"] = 
`<div
  class="card"
  style=""
>
  <div class="body">
    <div class="header">
      <slot name="header">
      </slot>
    </div>
    <div class="content">
      <slot>
      </slot>
    </div>
    <div class="footer">
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>
`;
/* end snapshot card standard */

snapshots["card standard with image"] = 
`<div
  class="card"
  style=""
>
  <div class="media">
    <card-image
      alt="image alt"
      src="tests/components/image/images/150.png"
    >
    </card-image>
  </div>
  <div class="body">
    <div class="header">
      <slot name="header">
      </slot>
    </div>
    <div class="content">
      <slot>
      </slot>
    </div>
    <div class="footer">
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>
`;
/* end snapshot card standard with image */

