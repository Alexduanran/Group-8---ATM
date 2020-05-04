import React, {useState} from "react";
import { Form, Input, Button, Label } from "semantic-ui-react"; 

export const InputForm = ({onEditInputO, onEditInputP, onEditInputN}) => {
    const [company, setCompany] = useState('GOOG');
    const [rep, setRep] = useState(100);
    const [input_layer, setInputLayer] = useState(20);
    const [start_date, setStartDate] = useState(2500);
    const [train_iteration, setTrainIteration] = useState(10000);
    const [drunkness_index, setDrunkness] = useState(1);
    const [num_of_starting_points, setStrPoints] = useState(5);
    const [hidden_layer_one, setHiddenLayerOne] = useState(5);
    const [hidden_layer_two, setHiddenLayerTwo] = useState(0);
    const [hidden_layer_three, setHiddenLayerThree] = useState(0);
    const [numHiddenLayer, setNumHiddenLayer] = useState(1);

    return (
        <div>
            <Form>
                <Form.Field>
                    <Input 
                        label = "Trading Name of Company"
                        labelPosition = "left"
                        value = {company}
                        onChange={e => setCompany(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <Input 
                        label = "# of Days in Test Set"
                        labelPosition = "left"
                        value = {rep}
                        onChange={e => setRep(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <Input 
                        label = "# of Consecutive Days in Each Test Set"
                        labelPosition = "left"
                        value = {input_layer}
                        onChange={e => setInputLayer(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <Input 
                        label = "Start Date"
                        labelPosition = "left"
                        value = {start_date}
                        onChange={e => setStartDate(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <Input 
                        label = "# of Training Iterations"
                        labelPosition = "left"
                        value = {train_iteration}
                        onChange={e => setTrainIteration(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <Input 
                        style = {{"text-align" : "right"}}
                        label = "Drunkness Index"
                        labelPosition = "left"
                        placeholder="100"
                        value = {drunkness_index}
                        onChange={e => setDrunkness(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <Input 
                        label = "# of Starting Points"
                        labelPosition = "left"
                        placeholder="100"
                        value = {num_of_starting_points}
                        onChange={e => setStrPoints(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <Label style={{"font-size": "15px"}}>Number of Hidden Layers</Label>
                    <Button.Group>
                    <Button active = {numHiddenLayer == 1 ? true : false} onClick={e => {setNumHiddenLayer(1)
                                            setHiddenLayerTwo(0)
                                            setHiddenLayerThree(0)}}>One</Button>
                    <Button onClick={e => {setNumHiddenLayer(2)
                                        setHiddenLayerThree(0)}}>Two</Button>
                    <Button onClick={e => setNumHiddenLayer(3)}>Three</Button>
                </Button.Group>
                </Form.Field>
                <Form.Field>
                    <Input 
                        label = "# of Nodes in the First Hidden Layer"
                        value = {hidden_layer_one}
                        onChange={e => setHiddenLayerOne(e.target.value)}
                    />
                </Form.Field>
                <Form.Field style={numHiddenLayer > 1 ? {} : {"display" : "none"}}>
                    <Input 
                        label = "# of Nodes in the Second Hidden Layer"
                        value = {hidden_layer_two}
                        onChange={e => setHiddenLayerTwo(e.target.value)}
                    />
                </Form.Field>
                <Form.Field style={numHiddenLayer > 2 ? {} : {"display" : "none"}}>
                    <Input 
                        label = "# of Nodes in the Third Hidden Layer"
                        value = {hidden_layer_three}
                        onChange={e => setHiddenLayerThree(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <Button color = 'twitter'
                        onClick={async () => {
                        const input = {company, rep, input_layer, start_date, train_iteration, drunkness_index, num_of_starting_points, hidden_layer_one, hidden_layer_two, hidden_layer_three};
                        const response = await fetch('/edit_inputs', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(input)
                        });

                        if (response.ok) {
                            fetch('/datas').then(response => 
                                response.json().then(data => {
                                    onEditInputO(data.original_arr);
                                    onEditInputP(data.predicted_arr);
                                })
                            );
                        }
                        onEditInputN(Number(input_layer), Number(numHiddenLayer), Number(hidden_layer_one), Number(hidden_layer_two), Number(hidden_layer_three))
                    }}>
                        submit
                    </Button>
                </Form.Field>
            </Form> 
        </div>
        
    )
}