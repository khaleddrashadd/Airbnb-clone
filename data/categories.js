import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property has windmills',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is modern',
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is modern',
  },
  {
    label: 'pools',
    icon: TbPool,
    description: 'This property has a pool',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island',
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is close to lake',
  },
  {
    label: 'skiing',
    icon: FaSkiing,
    description: 'This property has skiing activities',
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is in a castles',
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property has camping activities',
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property has camping activities',
  },
  {
    label: 'Cave',
    icon: GiCaveEntrance,
    description: 'This property is a cave',
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This property in the desert',
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This property in the barn',
  },
  {
    label: 'Lax',
    icon: IoDiamond,
    description: 'This property is luxurious',
  },
];
