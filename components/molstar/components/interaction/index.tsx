// import { createPortal } from 'react-dom'
// import './index.css'
// import { Checkbox } from '@nextui-org/react'
// import type { interactions, interactionsKeys } from '@/types/docking'
// import { InteractionsEnum } from '@/types/docking'
// import cn from '@/utils/classnames'
// type props = {
//   interactionsData: interactions
//   onClick: (key: interactionsKeys, value: InteractionsEnum) => void
// }
// const InteractionBox = ({ interactionsData, onClick }: props) => {
//   const init = () => {
//     const mainElement = document.querySelector('.msp-layout-main')
//     console.log('InteractionBox')
//     console.log(mainElement)
//     if (mainElement) {
//       const layoutElement = mainElement.querySelector('.msp-layout-static')
//       console.log(layoutElement)
//     }
//   }
//
//   const mainElement = document.querySelector('.msp-layout-main')
//   const layoutElement = mainElement?.querySelector('.msp-layout-static')
//
//   const handleClick = (key: interactionsKeys) => {
//     const value = interactionsData[key]
//     if (value === InteractionsEnum.on)
//       onClick(key, InteractionsEnum.off)
//     else
//       onClick(key, InteractionsEnum.on)
//   }
//
//   const content = () => {
//     return <>
//       <div className="interaction-box">
//         <div className={cn('interaction-label')} onClick={() => {
//           handleClick('ionic')
//         }}>
//           <Checkbox size="sm" className="p-1 ml-1" isSelected={interactionsData.ionic === InteractionsEnum.on} onValueChange={() => { handleClick('ionic') }}/>
//           <span
//             className={cn('interaction-name text-gray-1006 text-xs', interactionsData.ionic === InteractionsEnum.off ? 'interaction-name-disable' : '')}>Ionic</span>
//           <div className="interaction-dots-box ">
//             <div className='interaction-dots Ionic'></div>
//             <div className='interaction-dots Ionic'></div>
//             <div className='interaction-dots Ionic'></div>
//           </div>
//         </div>
//         <div className={cn('interaction-label')} onClick={() => {
//           handleClick('pi-stacking')
//         }}>
//           <Checkbox size="sm" className="p-1 ml-1" isSelected={interactionsData['pi-stacking'] === InteractionsEnum.on} onValueChange={() => { handleClick('pi-stacking') }}/>
//           <span
//             className={cn('interaction-name  text-gray-1006 text-xs', interactionsData['pi-stacking'] === InteractionsEnum.off ? 'interaction-name-disable' : '')}>Pi-pi stacking</span>
//           <div className="interaction-dots-box">
//             <div className='interaction-dots PiStacking'></div>
//             <div className='interaction-dots PiStacking'></div>
//             <div className='interaction-dots PiStacking'></div>
//           </div>
//         </div>
//
//         {/* <div className={cn('interaction-label')} onClick={() => { */}
//         {/*  handleClick('cation-pi') */}
//         {/* }}> */}
//         {/*  <Checkbox size="sm" className="p-1 ml-1" isSelected={interactionsData['cation-pi'] === InteractionsEnum.on} onValueChange={() => { handleClick('cation-pi') }}/> */}
//         {/*  <span */}
//         {/*    className={cn('interaction-name  text-gray-1006 text-xs', interactionsData['cation-pi'] === InteractionsEnum.off ? 'interaction-name-disable' : '')}>Cation-pi</span> */}
//         {/*  <div className="interaction-dots-box"> */}
//         {/*    <div className='interaction-dots CationPi'></div> */}
//         {/*    <div className='interaction-dots CationPi'></div> */}
//         {/*    <div className='interaction-dots CationPi'></div> */}
//         {/*  </div> */}
//         {/* </div> */}
//         <div className={cn('interaction-label')} onClick={() => {
//           handleClick('halogen-bonds')
//         }}>
//           <Checkbox size="sm" className="p-1 ml-1" isSelected={interactionsData['halogen-bonds'] === InteractionsEnum.on} onValueChange={() => { handleClick('halogen-bonds') }}/>
//           <span
//             className={cn('interaction-name  text-gray-1006 text-xs', interactionsData['halogen-bonds'] === InteractionsEnum.off ? 'interaction-name-disable' : '')}>Halogen bonds</span>
//           <div className="interaction-dots-box">
//             <div className='interaction-dots HalogenBond'></div>
//             <div className='interaction-dots HalogenBond'></div>
//             <div className='interaction-dots HalogenBond'></div>
//           </div>
//         </div>
//         <div className={cn('interaction-label')} onClick={() => {
//           handleClick('hydrogen-bonds')
//         }}>
//           <Checkbox size="sm" className="p-1 ml-1" isSelected={interactionsData['hydrogen-bonds'] === InteractionsEnum.on} onValueChange={() => { handleClick('hydrogen-bonds') }}/>
//           <span
//             className={cn('interaction-name  text-gray-1006 text-xs', interactionsData['hydrogen-bonds'] === InteractionsEnum.off ? 'interaction-name-disable' : '')}>Hydrogen bonds</span>
//           <div className="interaction-dots-box">
//             <div className='interaction-dots HydrogenBond'></div>
//             <div className='interaction-dots HydrogenBond'></div>
//             <div className='interaction-dots HydrogenBond'></div>
//           </div>
//         </div>
//         <div className={cn('interaction-label')} onClick={() => {
//           handleClick('weak-hydrogen-bonds')
//         }}>
//           <Checkbox size="sm" className="p-1 ml-1" isSelected={interactionsData['weak-hydrogen-bonds'] === InteractionsEnum.on} onValueChange={() => { handleClick('weak-hydrogen-bonds') }}/>
//           <span
//             className={cn('interaction-name  text-gray-1006 text-xs', interactionsData['weak-hydrogen-bonds'] === InteractionsEnum.off ? 'interaction-name-disable' : '')}>Weak hydrogen bonds</span>
//           <div className="interaction-dots-box">
//             <div className='interaction-dots WeakHydrogenBond'></div>
//             <div className='interaction-dots WeakHydrogenBond'></div>
//             <div className='interaction-dots WeakHydrogenBond'></div>
//           </div>
//         </div>
//         <div className={cn('interaction-label')} onClick={() => {
//           handleClick('hydrophobic')
//         }}>
//           <Checkbox size="sm" className="p-1 ml-1" isSelected={interactionsData.hydrophobic === InteractionsEnum.on} onValueChange={() => { handleClick('hydrophobic') }}/>
//           <span
//             className={cn('interaction-name  text-gray-1006 text-xs', interactionsData.hydrophobic === InteractionsEnum.off ? 'interaction-name-disable' : '')}>Hydrophobic</span>
//           <div className="interaction-dots-box">
//             <div className='interaction-dots Hydrophobic'></div>
//             <div className='interaction-dots Hydrophobic'></div>
//             <div className='interaction-dots Hydrophobic'></div>
//           </div>
//         </div>
//         <div className={cn('interaction-label')} onClick={() => {
//           handleClick('metal-coordination')
//         }}>
//           <Checkbox size="sm" className="p-1 ml-1" isSelected={interactionsData['metal-coordination'] === InteractionsEnum.on} onValueChange={() => { handleClick('metal-coordination') }}/>
//           <span
//             className={cn('interaction-name  text-gray-1006 text-xs', interactionsData['metal-coordination'] === InteractionsEnum.off ? 'interaction-name-disable' : '')}>Metal coordination</span>
//           <div className="interaction-dots-box">
//             <div className='interaction-dots MetalCoordination'></div>
//             <div className='interaction-dots MetalCoordination'></div>
//             <div className='interaction-dots MetalCoordination'></div>
//           </div>
//         </div>
//       </div>
//     </>
//   }
//   return layoutElement ? createPortal(content(), layoutElement) : null
// }
//
// export default InteractionBox
