// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconKey, IconFolder, IconBook, IconClipboardCheck, IconTag, IconReceipt, IconTarget, IconBug, IconNotebook, IconBriefcase, IconFileText, IconBuilding, IconCheck, IconChartBar  } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconBug,
  IconNotebook,
  IconBriefcase,
  IconFileText,
  IconBuilding,
  IconCheck,
  IconChartBar,
  IconTarget,
  IconReceipt,
  IconTag,
  IconClipboardCheck,
  IconFolder,
  IconBook
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: "Sirsi Web",
  icon: icons.IconNotebook,
  type: 'group',
  children: [
    {
      id: 'Bitacora',
      title: <FormattedMessage id="Bitacora" />,
      type: 'item',
      icon: icons.IconNotebook,
      url: '/bitacora',
      target: false
    },
    {
      id: 'Empresa',
      title: <FormattedMessage id="Empresas" />,
      type: 'collapse',
      icon: icons.IconBriefcase,
      children: [
        {
          id: 'Resultados',
          title: <FormattedMessage id="Resultados" />,
          type: 'item',
          icon: icons.IconTarget,
          url: '/empresa',
          target: false
        }
      ]
    },
   {
    id: "Administracion",
    title: <FormattedMessage id="Administracion" />,
    type: 'collapse',
    icon: icons.IconFileText,
    children: [
      {
        id: 'Facturas',
        title: <FormattedMessage id="Facturas" />,
        type: 'item',
        icon: icons.IconReceipt,
        url: '/facturas',
        target: false
      }
    ]
   },
   {
    id: "Dirección",
    title: <FormattedMessage id="Dirección" />,
    type: 'collapse',
    icon: icons.IconBuilding,
    children: [
      {
        id: 'Descuentos',
        title: <FormattedMessage id="Descuentos" />,
        type: 'item',
        icon: icons.IconTag,
        url: '/direccion/descuentos',
        target: false
      }
    ]
   },
   {
    id: "Encuesta",
    title: <FormattedMessage id="Encuesta" />,
    type: 'collapse',
    icon: icons.IconCheck,
    children: [
      {
        id: 'ResultadosEncuesta',
        title: <FormattedMessage id="ResultadosEncuesta" />,
        type: 'item',
        icon: icons.IconClipboardCheck,
        url: '/encuesta/resultadosencuesta',
        target: false
      }
    ]
   },
   {
    id: "Productividad",
    title: <FormattedMessage id="Productividad" />,
    type: 'collapse',
    icon: icons.IconChartBar,
    children: [
      {
        id: 'Expedientes',
        title: <FormattedMessage id="Expedientes" />,
        type: 'item',
        icon: icons.IconFolder,
        url: '/productividad/expedientes',
        target: false
      },
      {
        id: 'Estudios',
        title: <FormattedMessage id="Estudios" />,
        type: 'item',
        icon: icons.IconBook,
        url: '/productividad/estudios',
        target: false
      }
    ]
   }
  ]
};



export default pages;
