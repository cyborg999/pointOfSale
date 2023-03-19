function Dashboard(props){
    return (
        <div>
            Dashboard
            <button onClick={ () => props.setActiveUser("jordan")}>test</button>
        </div>
    )
}

export default Dashboard;