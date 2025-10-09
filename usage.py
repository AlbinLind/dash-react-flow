import dash_react_flow
import dash

app = dash.Dash()

app.layout = dash_react_flow.DashReactFlow(
    id="component",
    initial_nodes=[
        {"id": "node1", "position": {"x": 0, "y": 0}, "data": {"label": "Node 1"}}
    ],
)


if __name__ == "__main__":
    app.run(debug=True)
