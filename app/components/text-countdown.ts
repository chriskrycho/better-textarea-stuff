import Component from "@ember/component";
import classic from "ember-classic-decorator";
import { tagName } from "@ember-decorators/component";
import { isNone } from "@ember/utils";
import { action } from "@ember/object";
import { assert } from "@ember/debug";

@classic
@tagName("")
export default class TextCountdown extends Component {
  // Required args
  valueChanged!: (
    newValue: string,
    countdown: number,
    shouldShowCountdown: boolean,
    isCountdownLimitReached: boolean
  ) => unknown;
  textMaxLength!: number;
  value!: string;

  // Optional args
  beginCountdownAt!: number;
  countdownLimit = -1;

  init() {
    super.init();

    assert(
      "`valueChanged` action is required",
      typeof this.valueChanged === "function"
    );
    assert(
      "`textMaxLength` is required",
      typeof this.textMaxLength === "number"
    );
    assert(
      "`countdownLimit` must be a number",
      typeof this.countdownLimit === "number"
    );
    assert("`value` must be a string", typeof this.value === "string");

    if (isNone(this.beginCountdownAt)) {
      this.beginCountdownAt = this.textMaxLength;
    }
  }

  @action
  updateCountdown(newValue: string) {
    const countdown = this.textMaxLength - newValue.length;
    const shouldShowCountdown = countdown <= this.beginCountdownAt;
    const isCountdownLimitReached = countdown <= this.countdownLimit;

    this.valueChanged(
      newValue,
      countdown,
      shouldShowCountdown,
      isCountdownLimitReached
    );
  }
}
