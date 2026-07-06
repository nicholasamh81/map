import React, { useEffect } from 'react';
import useWorkspaceStore from '@/store/workspaceStore';
import Workspace from '@/components/Workspace/Workspace';

const App: React.FC = () => {
  const { loadFromLocalStorage } = useWorkspaceStore();

  useEffect(() => {
    // Load saved workspace on mount
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  return <Workspace />;
};

export default App;
