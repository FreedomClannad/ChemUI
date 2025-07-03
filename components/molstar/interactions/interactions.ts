/**
 * Copyright (c) 2019-2021 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { ParamDefinition as PD } from 'molstar/lib/mol-util/param-definition'
import type { RepresentationContext, RepresentationParamsGetter } from 'molstar/lib/mol-repr/representation'
import { Representation } from 'molstar/lib/mol-repr/representation'
import type { ThemeRegistryContext } from 'molstar/lib/mol-theme/theme'
import type { Structure } from 'molstar/lib/mol-model/structure'
import type { StructureRepresentation } from 'molstar/lib/mol-repr/structure/representation'
import { ComplexRepresentation, StructureRepresentationProvider, StructureRepresentationStateBuilder } from 'molstar/lib/mol-repr/structure/representation'
import { InteractionsProvider } from 'molstar/lib/mol-model-props/computed/interactions'
import { InteractionsInterUnitParams, InteractionsInterUnitVisual } from 'molstar/lib/mol-model-props/computed/representations/interactions-inter-unit-cylinder'
import type { CustomProperty } from 'molstar/lib/mol-model-props/common/custom-property'
import { getUnitKindsParam } from 'molstar/lib/mol-repr/structure/params'

const InteractionsVisuals = {
  'inter-unit': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, InteractionsInterUnitParams>) => ComplexRepresentation('Inter-unit interactions cylinder', ctx, getParams, InteractionsInterUnitVisual),
}

export const InteractionsParams = {
  ...InteractionsInterUnitParams,
  unitKinds: getUnitKindsParam(['atomic']),
  sizeFactor: PD.Numeric(0.2, { min: 0.01, max: 1, step: 0.01 }),
  visuals: PD.MultiSelect(['intra-unit', 'inter-unit'], PD.objectToOptions(InteractionsVisuals)),
}
export type InteractionsParamstype = typeof InteractionsParams
export function getInteractionParams(ctx: ThemeRegistryContext, structure: Structure) {
  return PD.clone(InteractionsParams)
}

export type InteractionRepresentationtype = StructureRepresentation<InteractionsParamstype>
export function InteractionRepresentation(ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, InteractionsParamstype>): InteractionRepresentationtype {
  return Representation.createMulti('Interactions', ctx, getParams, StructureRepresentationStateBuilder, InteractionsVisuals as unknown as Representation.Def<Structure, InteractionsParamstype>)
}

export const InteractionsRepresentationProvider = StructureRepresentationProvider({
  name: 'interactions',
  label: 'Non-covalent Interactions',
  description: 'Displays non-covalent interactions as dashed cylinders.',
  factory: InteractionRepresentation,
  getParams: getInteractionParams,
  defaultValues: PD.getDefaultValues(InteractionsParams),
  defaultColorTheme: { name: 'interaction-type' },
  defaultSizeTheme: { name: 'uniform' },
  isApplicable: (structure: Structure) => structure.elementCount > 0 && InteractionsProvider.isApplicable(structure),
  ensureCustomProperties: {
    attach: (ctx: CustomProperty.Context, structure: Structure) => InteractionsProvider.attach(ctx, structure, undefined, true),
    detach: data => InteractionsProvider.ref(data, false),
  },
  getData: (structure: Structure, props: PD.Values<InteractionsParamstype>) => {
    return props.includeParent ? structure.asParent() : structure
  },
  mustRecreate: (oldProps: PD.Values<InteractionsParamstype>, newProps: PD.Values<InteractionsParamstype>) => {
    return oldProps.includeParent !== newProps.includeParent
  },
})
