import dash_react_flow
import dash

app = dash.Dash()

app.layout = dash_react_flow.DashReactFlow(id="component")


if __name__ == "__main__":
    app.run(debug=True)
