# Nested Set Keystone field type

Add nested set field for Keystone headless CNS. It allows you to create and manipulate with tree-like structures with child and parent items.

## Nested Set model

The Nested Set model is described here:
https://en.wikipedia.org/wiki/Nested_set_model

This module stores nested set data in the database using field names:
`left`, `rigth`, `depth`

## Graphql Scheme

#### Output

- `left`: Int
- `right`: Int
- `depth`: Int
- `weight`: Int // Serial number through current branch
- `parentId`: ID// Keystone id of direct parent element
- `isLeaf`: Boolean, true if have no children
- `childrenCount` // counts children

#### Filters

- `parentId`: type ID // Keystone id of direct parent element
- `childOf` // filters all elements that are children of that Keystone id
- `parentOf` // filters all elements that are parent of that Keystone id
- `prevSiblingOf`: ID! // left sibling element, null if absent
- `nextSiblingOf`: ID! // right sibling element, null if absent

#### Mutation

##### Create and Update

- `parentId`: ID // Keystone id of direct parent element
- `prevSiblingId`: ID // Keystone id of left sibling element
- `nextSiblingId`: ID // Keystone id of right sibling element

##### Delete

If node has children they move to the parent of deleted node.

## Recompiling

The module requires to be compiled with the same major versions of the NPM modules:
- `keystone-6/core`
- `@keystone-ui/core`
- `@keystone-ui/fields`
- `graphql`

So, if you get problems on launching Keystone with this module, getting these errors:

- Schema must contain uniquely named types but contains multiple types named "OrderDirection".
- Duplicate "graphql" modules cannot be used at the same time

You need to change dependencies to the exact ones, that is uses in your application and in the `keystone-6/core` package.

### Recompiling procedure in case you have the Keystone Core from sources in your project.

1. Create a link to the sources of both projects - execute this command on each directory:
```
yarn link
```

2. In your project directory: cleanup the `node_modules` folder, link the Nested Set module, and preconstruct:

```
rm -rf ./node-modules && yarn link && yarn link keystone-field-nested-set && yarn preconstruct && yarn install
```
3. In `keystone-nested-set` directory: build with linked Keystone sources:
```
rm -rf ./node-modules && yarn link @keystone-6/core && yarn && yarn build
```

4. On your project directory: build with recently rebuilt Nested Set module:
```
yarn build
```
