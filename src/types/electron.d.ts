// 扩展Window接口以包含Electron相关方法
interface Window {
  electron?: {
    minimizeWindow: () => void;
    maximizeWindow: () => void;
    closeWindow: () => void;
    ipcRenderer?: {
      send: (channel: string, ...args: any[]) => void;
      on: (channel: string, listener: (...args: any[]) => void) => void;
      invoke: (channel: string, ...args: any[]) => Promise<any>;
    };
  };
} 