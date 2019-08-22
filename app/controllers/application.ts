import Controller from "@ember/controller";
import { action } from "@ember/object";

export default class Application extends Controller {
  show = false;
  reached = false;
  countdown?: number;

  value = "";

  @action
  countdownYo(
    value: string,
    countdown: number,
    show: boolean,
    reached: boolean
  ) {
    this.setProperties({ value, countdown, show, reached });
  }
}
