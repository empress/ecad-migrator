# ECAD migrator

This project is designed to allow you to migrate your documentation from [ember-cli-addon-docs](https://github.com/ember-learn/ember-cli-addon-docs) to [Field Guide](https://github.com/empress/field-guide).

## Usage

Run the following command in your addon directory.

```
npx ecad-migrator
```


## Why would I convert

There are a few reasons why you should convert your docs but the main one is SEO. `ember-cli-addon-docs` does a strange trick to allow it to work effectively on GitHub pages. If you want to see what Google sees when they crawl your docs site then right-click and hit "View Source". You will notice that you don't see the same content that the browser sees.

To compare this with what Field Guide can give you then to the same process on the [Ember Styleguide](https://ember-styleguide.netlify.app). This is because Field Guide is an [Empress](https://github.com/empress) project and is specifically designed to have great SEO.

Other reasons to convert:

- Field Guide has templates available that don't bleed any Styles into your documentation.
- Code samples use standard Markdown code blocks.
- Documentation is in a `docs` folder in the root of your addon instead of hidden away deep inside the dummy app


## Example addons

Here is a list of addons that are currently using Field Guide if you want to see it in action:

- [Ember Styleguide](https://github.com/ember-learn/ember-styleguide) - [demo](https://ember-styleguide.netlify.app)
-

Please feel free to add your addon to this list 🎉 Alternatively you can see dependants with [this link on GitHub](https://github.com/empress/field-guide/network/dependents)

## Requirements

This migrator needs Node 14+ to run
