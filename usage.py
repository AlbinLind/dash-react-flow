import dash_react_flow
import dash

app = dash.Dash()

app.layout = dash_react_flow.DashReactFlow(
    id="component",
    nodes=[
        {"id": "node1", "position": {"x": 0, "y": 0}, "label": "Node 1"},
        {"id": "node2", "position": {"x": 100, "y": 100}, "label": "Node 2"},
        {"id": "node3", "position": {"x": 200, "y": 0}, "label": "Node 3"},
    ],
    edges=[
        {"id": "edge1", "source": "node1", "target": "node2"},
        {"id": "edge2", "source": "node3", "target": "node2"},
    ],
)


@dash.callback(
    dash.Output("component", "nodes"),
    dash.Input("component", "nodes"),
    prevent_initial_call=True,
)
def update_initial_nodes(current_nodes):
    print(current_nodes)
    return dash.no_update


if __name__ == "__main__":
    app.run(debug=True)
