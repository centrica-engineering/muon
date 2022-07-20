import { staticHTML, unsafeStatic } from '@muonic/muon';
export default (name, el) => {
  const prefix = process.env.MUON_PREFIX;
  const element = `${prefix}-${name}`;

  if (!customElements.get(element)) {
    customElements.define(element, el);
  }

  const controlTypes = {
    String: 'text',
    Boolean: 'boolean',
    Array: 'Object'
  };
  const argsTypes = {};
  const componentInstance = new el();
  el.elementProperties?.forEach((key, value) => {
    if (!key?.state) {
      console.log(value, key);
      argsTypes[value] = {
        control: controlTypes[key.type.name],
        table: {
          category: 'Properties',
          defaultValue: {
            summary: componentInstance[value]
          }
        }
      };
    }
  });

  const elName = name ? name : element;
  const defaultValues = {
    title: element,
    component: elName,
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
      },
      ...argsTypes
    }
  };

  const getTagEl = () => {
    return unsafeStatic(element);
  };

  const dynamicArgs = (args) => {
    const dArgs = args && Object.keys(args).map((arg) => {
      if (arg === 'text') {
        return undefined;
      }

      if (typeof args[arg] === 'boolean') {
        return args[arg] === true ? arg : undefined;
      } else if (typeof args[arg] === 'number') {
        return `${arg}=${args[arg]}`;
      } else if (Array.isArray(args[arg])) {
        const arrayArgs = args[arg].map((arrayVal) => {
          return `"${arrayVal}"`;
        });
        return `${arg}=[${arrayArgs}]`;
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
