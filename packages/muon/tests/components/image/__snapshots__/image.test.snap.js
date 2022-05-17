/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["icon implements standard self"] = 
`<div class="image">
</div>
`;
/* end snapshot icon implements standard self */

snapshots["image implements standard self"] = 
`<div class="image">
</div>
`;
/* end snapshot image implements standard self */

snapshots["image implements src image"] = 
`<div
  class="image"
  style="--image-ratio:16 / 9;"
>
  <img
    alt=""
    class="blur-out image-lazy"
    src="tests/components/image/images/150.png"
  >
</div>
`;
/* end snapshot image implements src image */

snapshots["image implements ratio"] = 
`<div
  class="image"
  style="--image-ratio:1 / 1;"
>
  <img
    alt=""
    class="blur-out image-lazy"
    src="tests/components/image/images/150.png"
  >
</div>
`;
/* end snapshot image implements ratio */

snapshots["image implements background"] = 
`<div
  class="image is-background"
  style="--image-ratio:16 / 9;--background-size:cover;"
>
  <div
    class="blur-out image-holder"
    style="--background-image:url(&quot;tests/components/image/images/150.png&quot;);"
  >
  </div>
</div>
`;
/* end snapshot image implements background */

snapshots["image implements placeholder image"] = 
`<div
  class="image"
  style="--image-ratio:16 / 9;"
>
  <img
    alt=""
    class="blur image-lazy"
    src="tests/components/image/images/15.png"
  >
</div>
`;
/* end snapshot image implements placeholder image */

snapshots["image implements alt"] = 
`<div
  class="image"
  style="--image-ratio:16 / 9;"
>
  <img
    alt="alternative text for the image"
    class="blur-out image-lazy"
    src="tests/components/image/images/150.png"
  >
</div>
`;
/* end snapshot image implements alt */

snapshots["image fallsback on ratio if not correct"] = 
`<div
  class="image"
  style="--image-ratio:16 / 9;"
>
  <img
    alt=""
    class="blur-out image-lazy"
    src="tests/components/image/images/150.png"
  >
</div>
`;
/* end snapshot image fallsback on ratio if not correct */

snapshots["image fallsback on image padding if aspect-ratio not available"] = 
`<div
  class="image"
  style="--image-padding:56.25%;"
>
  <img
    alt=""
    class="blur-out image-lazy"
    src="tests/components/image/images/150.png"
  >
</div>
`;
/* end snapshot image fallsback on image padding if aspect-ratio not available */

snapshots["image image fails to loads"] = 
`<div
  class="image"
  style="--image-padding:56.25%;"
>
</div>
`;
/* end snapshot image image fails to loads */

snapshots["image image fails to load"] = 
`<div
  class="image"
  style="--image-ratio:16 / 9;"
>
</div>
`;
/* end snapshot image image fails to load */

snapshots["image image is eager"] = 
`<div
  class="image"
  style="--image-ratio:16 / 9;"
>
  <img
    alt=""
    class="blur-out image-lazy"
    src="tests/components/image/images/150.png"
  >
</div>
`;
/* end snapshot image image is eager */

snapshots["image image fails to load for background"] = 
`<div
  class="image"
  style="--image-ratio:16 / 9;"
>
</div>
`;
/* end snapshot image image fails to load for background */

snapshots["image implements placeholder image for background"] = 
`<div
  class="image is-background"
  style="--image-ratio:16 / 9;--background-size:cover;"
>
  <div
    class="blur image-holder"
    style="--background-image:url(&quot;tests/components/image/images/15.png&quot;);"
  >
  </div>
</div>
`;
/* end snapshot image implements placeholder image for background */

snapshots["image implements placeholder image for chrome"] = 
`<div
  class="image"
  style="--image-ratio:16 / 9;"
>
</div>
`;
/* end snapshot image implements placeholder image for chrome */

snapshots["image fallsback for ratios"] = 
`<div
  class="image"
  style="--image-ratio:16 / 9;"
>
  <img
    alt=""
    class="blur-out image-lazy"
    src="https://via.placeholder.com/150"
  >
</div>
`;
/* end snapshot image fallsback for ratios */

snapshots["image fallback for ratio"] = 
`<div
  class="image is-background"
  style="--image-ratio:16 / 9;--background-size:cover;"
>
  <div
    class="blur-out image-holder"
    style="--background-image:url(&quot;https://via.placeholder.com/150&quot;);"
  >
  </div>
</div>
`;
/* end snapshot image fallback for ratio */

