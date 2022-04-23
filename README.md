# strapi-provider-email-googleapis

Email provider for [Strapi v3](https://github.com/strapi/strapi) and [Strapi v4](https://github.com/strapi/strapi) based on [Gmail API](https://developers.google.com/gmail/api)

## Installation

```bash
yarn add strapi-provider-email-googleapis
```

For Strapi v4

```bash
yarn add @strapi/strapi-provider-email-googleapis@npm:strapi-provider-email-googleapis
```

## Setup

1. [Follow these instructions](https://developers.google.com/gmail/api/quickstart/nodejs)

2. Configure the provider in config/plugins

| Variable                        | Type   | Description                                                    | Required | Default              |
| ------------------------------- | ------ | -------------------------------------------------------------- | -------- | -------------------- |
| provider                        | string | The name of the provider you use                               | yes      |                      |
| providerOptions                 | object | Provider options                                               | yes      |                      |
| providerOptions.credentialsPath | string | Path to credentials.json                                       | yes      |                      |
| providerOptions.tokenPath       | string | Path to token.json                                             | yes      |                      |
| settings                        | object | Settings                                                       | yes      |                      |
| settings.defaultFrom            | string | Default sender mail address                                    | yes      |                      |
| settings.defaultReplyTo         | string | Default address or addresses the receiver is asked to reply to | no       | settings.defaultFrom |

### Example

**Path -** `config/plugins.js`

```js
module.exports = ({ env }) => ({
  // ...
  email: {
    provider: "googleapis",
    providerOptions: {
      credentialsPath: path.join(__dirname, "../credentials.json"),
      tokenPath: path.join(__dirname, "../token.json")
    },
    settings: {
      defaultFrom: "mail@example.com",
      defaultReplyTo: "mail@example.com"
    }
  }
  // ...
});
```

## Resources

- [MIT License](LICENSE.md)
