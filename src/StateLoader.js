class StateLoader {

    loadState() {
        try {
            let serializedState = localStorage.getItem("kairos:state");
            if (serializedState === null) {
                return this.initializeState();
            }
            return JSON.parse(serializedState);
        }
        catch (err) {
            return this.initializeState();
        }
    }

    saveState(state) {
        try {
            let serializedState = JSON.stringify(state);
            localStorage.setItem("kairos:state", serializedState);

        }
        catch (err) {}
    }

    initializeState() {
        return (
            { 
                isLoggedIn: false
            }
        )
    }
}
export default StateLoader