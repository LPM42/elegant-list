// MondoDB collection name == tasks
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This runs only on client
  Template.body.helpers({
    // Default sorting is by date of creation (most recent first)
    tasks: function() {
      return Tasks.find({}, {sort: {timeCreated: -1}});
    }
  });

  Template.body.events({
    // submit function is called when the new task form is submited
    // TODO: add sort by priority functionality
    "submit .new-task": function (event) {
      var task = event.target.task.value;
      var description = event.target.description.value;
      Tasks.insert({
        task: task,
        description: description,
        timeCreated: new Date() // Add timestamp
      });

      //Reset form
      event.target.task.value = "";
      event.target.description.value = "";

      //Prevent default form submit action
      return false;
    }
  });

  Template.task.events({
    "click .remove": function() {
      Tasks.remove(this._id);
    }
  });
}
