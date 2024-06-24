import {createContext, ReactElement, useContext, useState} from "react";
import FolderNavigationModel from "@/utils/models/FolderNavigation.model.ts";
import FolderActionsModel from "@/utils/models/FolderActions.model.ts";

const NavigationContext = createContext<FolderNavigationModel | null>(null);

function NavigationProvider({children}: { children: ReactElement }) {
    const [history, setHistory] = useState<string[]>([]); // useState inside the component

    const actions: FolderActionsModel = {
        add(path: string) {
            setHistory((prevState) => [...prevState, path]);
        },
        clear() {
            setHistory([]);
        },
        setAs(path: string) {
            setHistory([path])
        },
        pop() {
            let newHistory: string[] = [];
            setHistory((prevState) => {
                let historyCopy = [...prevState];
                historyCopy.pop();
                newHistory = historyCopy
                return historyCopy;
            });
            return newHistory;
        }
    };

    return (
        <NavigationContext.Provider value={{history, actions} as FolderNavigationModel}>
            {children}
        </NavigationContext.Provider>
    );
}

const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
}
export {NavigationProvider, useNavigation};
