/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["card default"] = 
`<div class="heading">
  <slot name="header">
  </slot>
</div>
<div class="content">
  <slot>
  </slot>
</div>
<div class="action">
  <slot name="action">
  </slot>
</div>
`;
/* end snapshot card default */

snapshots["card standard"] = 
`<div class="heading">
  <slot name="header">
  </slot>
</div>
<div class="content">
  <slot>
  </slot>
</div>
<div class="action">
  <slot name="action">
  </slot>
</div>
`;
/* end snapshot card standard */

snapshots["card flat"] = 
`<div class="heading">
  <slot name="header">
  </slot>
</div>
<div class="content">
  <slot>
  </slot>
</div>
<div class="action">
  <slot name="action">
  </slot>
</div>
`;
/* end snapshot card flat */

snapshots["card support without image"] = 
`<div class="heading">
  <slot name="header">
  </slot>
</div>
<div class="content">
  <slot>
  </slot>
</div>
<div class="action">
  <slot name="action">
  </slot>
</div>
`;
/* end snapshot card support without image */

snapshots["card support with image"] = 
`<div class="media">
  <card-image
    alt="image alt"
    src="https://www.britishgas.co.uk/aem6/content/dam/britishgas/images/smart-meters/Technology/Lockup%202.png"
  >
  </card-image>
</div>
<div class="heading">
  <slot name="header">
  </slot>
</div>
<div class="content">
  <slot>
  </slot>
</div>
<div class="action">
  <slot name="action">
  </slot>
</div>
`;
/* end snapshot card support with image */

