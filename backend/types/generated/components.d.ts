import type { Schema, Struct } from '@strapi/strapi';

export interface BasicFeature extends Struct.ComponentSchema {
  collectionName: 'components_basic_features';
  info: {
    displayName: 'Feature';
    icon: 'crown';
  };
  attributes: {
    Name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'basic.feature': BasicFeature;
    }
  }
}
