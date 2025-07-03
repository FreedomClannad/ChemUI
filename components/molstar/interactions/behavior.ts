import * as DynamicRepresentation from 'molstar/lib/mol-plugin/behavior/dynamic/representation'
import * as DynamicCamera from 'molstar/lib/mol-plugin/behavior/dynamic/camera'
import * as DynamicCustomProps from './custom-props'

export * from 'molstar/lib/mol-plugin/behavior/behavior'

export const rePluginBehaviors = {
  Representation: DynamicRepresentation,
  Camera: DynamicCamera,
  CustomProps: DynamicCustomProps,
}
