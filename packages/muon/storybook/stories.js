import { staticHTML, unsafeStatic } from '@muonic/muon';
export default (name, el, prefix = process.env.MUON_PREFIX) => {
  const element = prefix ? `${prefix}-${name}` : name;

  if (!customElements.get(element)) {
    customElements.define(element, el);
  }

  const elName = name ? name : element;
  const defaultValues = {
    title: element,
    component: element,
    argTypes: {
      registry: {
        table: {
          disable: true
        }
      },
      renderOptions: {
        table: {
          disable: true
        }
      },
      shadowRootOptions: {
        table: {
          disable: true
        }
      },
      scopedElements: {
        table: {
          disable: true
        }
      },
      slottedStyles: {
        table: {
          disable: true
        }
      }
    }
  };

  const getTagEl = () => {
    return unsafeStatic(element);
  };

  const dynamicArgs = (args) => {
    const elDefaultAttrs = [
      'class',
      'id',
      'data-',
      'slot',
      'style',
      'title',
      'aria-',
      'role',
      'tabindex',
      'lang',
      'dir'
    ];

    const dArgs = args && Object.keys(args).map((arg) => {
      if (
        !el.observedAttributes?.includes(arg) && elDefaultAttrs.every((attr) => !arg.startsWith(attr))
      ) {
        return undefined;
      }

      if (typeof args[arg] === 'boolean') {
        return args[arg] === true ? arg : undefined;
      } else if (typeof args[arg] === 'number') {
        return `${arg}=${args[arg]}`;
      } else if (Array.isArray(args[arg]) || typeof args[arg] === 'object') {
        return `${arg}='${JSON.stringify(args[arg])}'`;
      } else {
        return `${arg}="${args[arg]}"`;
      }
    }).filter((arg) => arg).join(' ');

    return unsafeStatic(dArgs);
  };

  const template = (args, inner) => {
    const tag = getTagEl();
    const dArgs = dynamicArgs(args);
    return staticHTML`
      <${tag} ${dArgs}>${inner ? inner(args) : ''}</${tag}>`;
  };

  return {
    defaultValues,
    element,
    elName,
    template,
    getTagEl,
    dynamicArgs
  };

};
