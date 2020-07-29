import React from 'react';

const ListItems = (props) => {
    const listItems = props.dataReceived.map(item => {
        return <a href="#" onClick={() => props.displayChart(item.Path)}
            className="list-group-item list-group-item-action"
            key={item.Name}>{item.Name}</a>
    })

    return (
        <div>
            <div className="list-group mt-5 ml-3 mr-3" style={{ width: '80%' }}>
                {listItems}
            </div>
        </div>
    );
}

export default ListItems;