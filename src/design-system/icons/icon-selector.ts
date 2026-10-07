import * as Icon from ".";

// ATENÇÃO - Ao criar um icone em SVG, coloque seu nome de chamada (string) no IconSelectorDTO
export type IconSelectorStrings =
  | "NomeDoIcone"
  /* | "ArrowUp"
  | "ArrowLeft"
  | "ArrowRight"
  | "CheckBoxChecked"
  | "CheckBoxUnchecked"
  | "AlertCircle"
  | "AlertOctagon"
  | "AlertTriangle"
  | "Check"
  | "InfoCircle"
  | "House"
  | "RoyalLimogesFull"
  | "RoyalLimogesShort"
  | "Search"
  | "Service"
  | "Psize"
  | "Msize"
  | "Gsize"
  | "Facebook"
  | "Instagram"
  | "Pinterest"
  | "Tiktok"
  | "Youtube"
  | "Whatsapp"
  | "Star"
  | "TBLogo"
  | "TBLogoMobile"
  | "User"
  | "Bookmark"
  | "Calendar"
  | "ChevronDown"
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronUp"
  | "CreditCard"
  | "Download"
  | "Eye"
  | "EyeOff"
  | "Minus"
  | "ShareOne"
  | "ShareTwo"
  | "Trash"
  | "X"
  | "ZoomIn"
  | "ZoomOut"
  | "Filter"
  | "ShoppingBag"
  | "Bag"
  | "Plus"
  | "Home"
  | "Edit"
  | "EditThree"
  | "Gift"
  | "Grid"
  | "Heart"
  | "Login"
  | "Logout"
  | "Mail"
  | "MessageSquare"
  | "Sliders"
  | "Pix"
  | "BankInvoice"
  | "Close"
  | "P"
  | "M"
  | "G"
  | "GreaterThan"
  | "LessThan"
  | "RoyalLimogesMini"
  | "Dot"
  | "Height"
  | "Weight"
  | "Diameter"
  | "Depth"
  | "Capacity"
  | "Maximize"
  | "ArrowDownBig"
  | "Phone"
  | "Email"
  | "Glasslens"
  | "XCircle" */

// ATENÇÃO - Após a etapa anterior, importe seu TSX no index dessa pasta e adicione-o ao IconSelector no formato Icon.NomeDoIcone.
/**
 * IconSelector é um objeto que contém todos os ícones disponíveis para serem utilizados no projeto.
 *
 * @example  <IconSelector.AlertCircle width={24} height={24} />
 *
 * @example <Button variant="icon-only" hasIcon Icon={"Bag"} />
 *
 * @type IconSelectorDTO
 */
export const IconSelector: Record<
  IconSelectorStrings,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  NomeDoIcone: Icon.NomeDoIcone,
};

export type IconSelectorDTO = typeof IconSelector;
