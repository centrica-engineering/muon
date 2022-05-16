/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["card default"] = 
`<div class="card">
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
`<div class="card">
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
`<div class="card">
  <div class="media">
    <card-image
      alt="image alt"
      src="https://www.britishgas.co.uk/aem6/content/dam/britishgas/images/smart-meters/Technology/Lockup%202.png"
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
