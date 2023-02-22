type Task = {
	fn: (data?: any) => void;
	duration: number;
	data?: any;
};

class Scheduler {
	timer: null | ReturnType<typeof setTimeout> = null;
	tasks: Array<Task> = [];

	addToStack: (task: Task) => void = (task) => {
		this.tasks.push(task);

		// console.log("this.timer", this.timer);

		if (this.timer) return;

		this.runNextTask();
	};

	runNextTask: () => void = () => {
		if (this.timer) return;

		let nextTask = this.tasks.shift();

		if (!nextTask) return;

		this.timer = setTimeout(() => {
			nextTask?.fn(nextTask.data);
			this.timer = null;
			this.runNextTask();
		}, nextTask.duration);
	};
}

export const scheduler: Scheduler = new Scheduler();
