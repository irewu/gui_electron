// 资产类型定义
export interface Asset {
  id: string;
  name: string;
  type: string;
  location: string;
  status: string;
  purchaseDate: string;
  value: string;
  note: string;
  attachments: Array<{
    id: number;
    name: string;
    type: string;
    security: string;
    uploadTime: string;
    size: string;
  }>;
}

// 文件类型定义
export interface FileItem {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadTime: string;
  security: string;
  assetId: string;
  assetName: string;
}

// 模拟资产数据
export const mockAssets: Asset[] = [
  {
    id: 'ASSET-2025-001',
    name: '办公笔记本电脑 - XPS 15',
    type: '电子设备',
    location: '研发部',
    status: '使用中',
    purchaseDate: '2024-02-15',
    value: '15,800',
    note: '配置: i7 处理器, 32GB 内存, 1TB 固态硬盘, 4K 显示屏',
    attachments: [
      {
        id: 1,
        name: '笔记本电脑说明书.pdf',
        type: '文档',
        security: 'public',
        uploadTime: '2024-02-16',
        size: '3.5 MB'
      },
      {
        id: 2,
        name: '设备采购发票.pdf',
        type: '文档',
        security: 'confidential',
        uploadTime: '2024-02-16',
        size: '760 KB'
      }
    ]
  },
  {
    id: 'ASSET-2025-002',
    name: '会议室投影仪',
    type: '办公设备',
    location: '会议室A',
    status: '维修中',
    purchaseDate: '2023-11-05',
    value: '7,600',
    note: '4K分辨率，支持无线投屏',
    attachments: [
      {
        id: 3,
        name: '投影仪使用指南.pdf',
        type: '文档',
        security: 'public',
        uploadTime: '2023-11-10',
        size: '2.1 MB'
      },
      {
        id: 4,
        name: '维修记录.docx',
        type: '文档',
        security: 'public',
        uploadTime: '2024-04-05',
        size: '420 KB'
      }
    ]
  },
  {
    id: 'ASSET-2025-003',
    name: '服务器设备',
    type: '网络设备',
    location: '数据中心',
    status: '使用中',
    purchaseDate: '2023-08-12',
    value: '58,500',
    note: '核心业务服务器，双路处理器配置',
    attachments: [
      {
        id: 5,
        name: '服务器配置文档.pdf',
        type: '文档',
        security: 'confidential',
        uploadTime: '2023-08-15',
        size: '5.2 MB'
      },
      {
        id: 6,
        name: '服务器机柜照片.jpg',
        type: '图片',
        security: 'public',
        uploadTime: '2023-08-20',
        size: '3.8 MB'
      },
      {
        id: 7,
        name: '数据中心布局图.dwg',
        type: '文档',
        security: 'confidential',
        uploadTime: '2023-09-01',
        size: '8.7 MB'
      }
    ]
  },
  {
    id: 'ASSET-2025-004',
    name: '办公桌椅套装',
    type: '办公设备',
    location: '市场部',
    status: '闲置',
    purchaseDate: '2023-05-20',
    value: '3,200',
    note: '人体工学椅和电动升降桌',
    attachments: []
  },
  {
    id: 'ASSET-2025-005',
    name: '网络交换机',
    type: '网络设备',
    location: '机房',
    status: '使用中',
    purchaseDate: '2023-10-08',
    value: '12,800',
    note: '48端口万兆交换机',
    attachments: [
      {
        id: 8,
        name: '交换机配置备份.txt',
        type: '文档',
        security: 'confidential',
        uploadTime: '2023-10-15',
        size: '128 KB'
      }
    ]
  }
];

// 模拟文件数据
export const mockFiles: FileItem[] = [
  {
    id: 1,
    name: '笔记本电脑说明书.pdf',
    type: '文档',
    size: '3.5 MB',
    uploadTime: '2024-02-16',
    security: 'public',
    assetId: 'ASSET-2025-001',
    assetName: '办公笔记本电脑 - XPS 15'
  },
  {
    id: 2,
    name: '设备采购发票.pdf',
    type: '文档',
    size: '760 KB',
    uploadTime: '2024-02-16',
    security: 'confidential',
    assetId: 'ASSET-2025-001',
    assetName: '办公笔记本电脑 - XPS 15'
  },
  {
    id: 3,
    name: '投影仪使用指南.pdf',
    type: '文档',
    size: '2.1 MB',
    uploadTime: '2023-11-10',
    security: 'public',
    assetId: 'ASSET-2025-002',
    assetName: '会议室投影仪'
  },
  {
    id: 4,
    name: '维修记录.docx',
    type: '文档',
    size: '420 KB',
    uploadTime: '2024-04-05',
    security: 'public',
    assetId: 'ASSET-2025-002',
    assetName: '会议室投影仪'
  },
  {
    id: 5,
    name: '服务器配置文档.pdf',
    type: '文档',
    size: '5.2 MB',
    uploadTime: '2023-08-15',
    security: 'confidential',
    assetId: 'ASSET-2025-003',
    assetName: '服务器设备'
  },
  {
    id: 6,
    name: '服务器机柜照片.jpg',
    type: '图片',
    size: '3.8 MB',
    uploadTime: '2023-08-20',
    security: 'public',
    assetId: 'ASSET-2025-003',
    assetName: '服务器设备'
  },
  {
    id: 7,
    name: '数据中心布局图.dwg',
    type: '文档',
    size: '8.7 MB',
    uploadTime: '2023-09-01',
    security: 'confidential',
    assetId: 'ASSET-2025-003',
    assetName: '服务器设备'
  },
  {
    id: 8,
    name: '交换机配置备份.txt',
    type: '文档',
    size: '128 KB',
    uploadTime: '2023-10-15',
    security: 'confidential',
    assetId: 'ASSET-2025-005',
    assetName: '网络交换机'
  },
  {
    id: 9,
    name: '资产管理系统用户手册.pdf',
    type: '文档',
    size: '4.3 MB',
    uploadTime: '2024-03-01',
    security: 'public',
    assetId: '',
    assetName: '通用文档'
  },
  {
    id: 10,
    name: '资产盘点流程.pptx',
    type: '演示文稿',
    size: '2.8 MB',
    uploadTime: '2024-01-20',
    security: 'public',
    assetId: '',
    assetName: '通用文档'
  }
]; 