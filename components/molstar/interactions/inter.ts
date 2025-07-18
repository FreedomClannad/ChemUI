import { PluginBehavior } from 'molstar/lib/mol-plugin/behavior/behavior'
import { ParamDefinition as PD } from 'molstar/lib/mol-util/param-definition'
import { InteractionsProvider } from 'molstar/lib/mol-model-props/computed/interactions'
import type { Structure } from 'molstar/lib/mol-model/structure'
import { StateSelection } from 'molstar/lib/mol-state'
import { PluginStateObject } from 'molstar/lib/mol-plugin-state/objects'
import { StructureElement } from 'molstar/lib/mol-model/structure/structure/element'
import { OrderedSet } from 'molstar/lib/mol-data/int'
import { featureGroupLabel, featureTypeLabel } from 'molstar/lib/mol-model-props/computed/interactions/common'
import type { Loci } from 'molstar/lib/mol-model/loci'
import { arraySetAdd } from 'molstar/lib/mol-util/array'
import { InteractionTypeColorThemeProvider } from 'molstar/lib/mol-model-props/computed/themes/interaction-type'
// import { InteractionsRepresentationProvider } from '../../../../../mol-model-props/computed/representations/interactions';
import { InteractionsRepresentationProvider } from './interactions'

export const Interactions = PluginBehavior.create<{ autoAttach: boolean; showTooltip: boolean }>({
  name: 'recomputed-interactions-prop',
  category: 'custom-props',
  display: { name: 'Interactions' },
  ctor: class extends PluginBehavior.Handler<{ autoAttach: boolean; showTooltip: boolean }> {
    private provider = InteractionsProvider

    private getStructures(structure: Structure) {
      const structures: Structure[] = []
      const root = this.ctx.helpers.substructureParent.get(structure)
      if (root) {
        const state = this.ctx.state.data
        const selections = state.select(StateSelection.Generators.ofType(PluginStateObject.Molecule.Structure, root.transform.ref))
        for (const s of selections) {
          if (s.obj)
            arraySetAdd(structures, s.obj.data)
        }
      }
      return structures
    }

    private labelProvider = {
      label: (loci: Loci): string | undefined => {
        if (!this.params.showTooltip)
          return undefined

        switch (loci.kind) {
          case 'element-loci': {
            if (loci.elements.length === 0)
              return undefined

            const labels: string[] = []
            const structures = this.getStructures(loci.structure)

            for (const s of structures) {
              const interactions = this.provider.get(s).value
              if (!interactions)
                continue

              const l = StructureElement.Loci.remap(loci, s)
              if (l.elements.length !== 1)
                continue

              const e = l.elements[0]
              if (OrderedSet.size(e.indices) !== 1)
                continue

              const features = interactions.unitsFeatures.get(e.unit.id)
              if (!features)
                continue

              const typeLabels: string[] = []
              const groupLabels: string[] = []
              const label: string[] = []

              const idx = OrderedSet.start(e.indices)
              const { types, groups, elementsIndex: { indices, offsets } } = features
              for (let i = offsets[idx], il = offsets[idx + 1]; i < il; ++i) {
                const f = indices[i]
                const type = types[f]
                const group = groups[f]
                if (type)
                  typeLabels.push(featureTypeLabel(type))
                if (group)
                  groupLabels.push(featureGroupLabel(group))
              }

              if (typeLabels.length)
                label.push(`<small>Types</small> ${typeLabels.join(', ')}`)
              if (groupLabels.length)
                label.push(`<small>Groups</small> ${groupLabels.join(', ')}`)
              if (label.length)
                labels.push(`Interaction Feature: ${label.join(' | ')}`)
            }

            return labels.length ? labels.join('<br/>') : undefined
          }
          default: return undefined
        }
      },
    }

    update(p: { autoAttach: boolean; showTooltip: boolean }) {
      const updated = (
        this.params.autoAttach !== p.autoAttach
                || this.params.showTooltip !== p.showTooltip
      )
      this.params.autoAttach = p.autoAttach
      this.params.showTooltip = p.showTooltip
      this.ctx.customStructureProperties.setDefaultAutoAttach(this.provider.descriptor.name, this.params.autoAttach)
      return updated
    }

    register(): void {
      this.ctx.customStructureProperties.register(this.provider, this.params.autoAttach)
      this.ctx.representation.structure.themes.colorThemeRegistry.add(InteractionTypeColorThemeProvider)
      this.ctx.managers.lociLabels.addProvider(this.labelProvider)
      this.ctx.representation.structure.registry.add(InteractionsRepresentationProvider)
    }

    unregister() {
      this.ctx.customStructureProperties.unregister(this.provider.descriptor.name)
      this.ctx.representation.structure.themes.colorThemeRegistry.remove(InteractionTypeColorThemeProvider)
      this.ctx.managers.lociLabels.removeProvider(this.labelProvider)
      this.ctx.representation.structure.registry.remove(InteractionsRepresentationProvider)
    }
  },
  params: () => ({
    autoAttach: PD.Boolean(false),
    showTooltip: PD.Boolean(true),
  }),
})
