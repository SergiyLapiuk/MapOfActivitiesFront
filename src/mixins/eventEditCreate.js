const eventEditCreate = {
  computed: {
    validateTime() {
      if (this.isTypeHistoric == true) {
        return true;
      }

      if (!this.endTime || !this.startTime) {
        return "Оберіть час";
      }

      let maxHours = this.type?.maxDuration ?? 10;
      let diff =
        Math.abs(new Date(this.endTime) - new Date(this.startTime)) / 36e5;

      if (diff > maxHours) {
        return "Тривалість події занадто велика для обраного типу.";
      }
      if (diff * 60 < 15) {
        return "Тривалість події занадто коротка.";
      }
    },
  },
};
