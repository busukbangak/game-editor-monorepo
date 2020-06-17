import { Manager } from './Manager'
import * as Stats from "stats-js";

class StatisticManager extends Stats implements Manager {

    private static statisticHandler: Stats;

    constructor() {
        super();
        StatisticManager.statisticHandler = new Stats();
        document.body.appendChild(StatisticManager.statisticHandler.dom);
        StatisticManager.hideStats();
    }

    public static showStats() {
        StatisticManager.statisticHandler.showPanel(0);
    }

    public static hideStats() {
        StatisticManager.statisticHandler.showPanel(3);
    }

    public static beginMonitoring() {
        StatisticManager.statisticHandler.begin();
    }

    public static endMonitoring() {
        StatisticManager.statisticHandler.end();
    }
}

export { StatisticManager };