import {createContext, ReactElement, useContext, useState} from "react";
import FolderNavigationModel from "@/utils/models/FolderNavigation.model.ts";
import FolderActionsModel from "@/utils/models/FolderActions.model.ts";

const NavigationContext = createContext<FolderNavigationModel | null>(null);

function NavigationProvider({children}: { children: ReactElement }) {
    const [historyListing, setHistoryListing] = useState<string[]>([]); // useState inside the component
    const [historySelecting, setHistorySelecting] = useState<string[]>([]); // useState inside the component

    const actionsListing: FolderActionsModel = {
        add(path: string) {
            setHistoryListing((prevState) => [...prevState, path]);
        },
        clear() {
            setHistoryListing([]);
        },
        setAs(path: string) {
            setHistoryListing([path])
        },
        pop() {
            let newHistory: string[] = [];
            setHistoryListing((prevState) => {
                let historyCopy = [...prevState];
                historyCopy.pop();
                newHistory = historyCopy
                return historyCopy;
            });
            return newHistory;
        }
    };

    const actionsSelecting: FolderActionsModel = {
        add(path: string) {
            setHistorySelecting((prevState) => [...prevState, path]);
        },
        clear() {
            setHistorySelecting([]);
        },
        setAs(path: string) {
            setHistorySelecting([path])
        },
        pop() {
            let newHistory: string[] = [];
            setHistorySelecting((prevState) => {
                let historyCopy = [...prevState];
                historyCopy.pop();
                newHistory = historyCopy
                return historyCopy;
            });
            return newHistory;
        }
    };

    return (
        <NavigationContext.Provider value={{
            listing: {historyListing, actionsListing},
            selecting: {historySelecting, actionsSelecting}
        } as FolderNavigationModel}>
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
