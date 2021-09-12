const ChangeType = {
  FIXED : 0,
  APPRECIATING : 1,
  DEPRECIATING : -1
}

class Entity {
  constructor(name, description, changeType, changeRate, initialValue) {
    this.id = Math.floor(Math.random() * 100);
    this.name = name;
    this.description = description;
    this.changeType = changeType;
    this.changeRate = changeRate;
    this.initialValue = initialValue;
  }
}

class ActiveEntity extends Entity {
  constructor(name, description, changeType, changeRate, initialValue) {
    super(name, description, changeType, changeRate, initialValue);
    this.duration = 0 ;
    this.currentValue = initialValue;
  }

  tick() {
    this.duration++;
    this.currentValue = compound(this.initialValue, this.changeRate * ChangeType[this.changeType], duration);
  }

  computeFor(duration) {
    this.duration = duration;
    this.currentValue = compound(this.initialValue, this.changeRate * ChangeType[this.changeType], duration);
  }
}

class TransactionCondition {
  constructor(duration) {

  }
}

function compound(principal, ratePerTime, time) {
  return principal * ((1 + ratePerTime/100)**time);
}
