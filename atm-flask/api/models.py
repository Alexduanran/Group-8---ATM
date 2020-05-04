from . import db

class Input(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(10))
    rep = db.Column(db.Integer)
    input_layer = db.Column(db.Integer)
    start_date = db.Column(db.Integer)
    train_iteration = db.Column(db.Integer)
    drunkness_index = db.Column(db.Integer)
    num_of_starting_points = db.Column(db.Integer)
    hidden_layer_one = db.Column(db.Integer)
    hidden_layer_two = db.Column(db.Integer)
    hidden_layer_three = db.Column(db.Integer)