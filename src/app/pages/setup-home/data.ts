import { ICONS } from '_metronic/assets/icons/icons';

export interface IDataLayout {
    id: number,
    layout_for: string,
    layout_type: string,
    icon: string,
    title: string
}

const dataLayout = [
    { id: 1, layout_for: "BANNERS", layout_type: "SLIDE", icon: ICONS.bannersArray, title: "Băng chuyền" },
    // { id: 2, layout_for: "BANNERS", layout_type: "GRID", icon: ICONS.layoutGrid, title: "Lưới" }
]
export default dataLayout