import { Component, OnDestroy, OnInit } from '@angular/core';
import { EngineService } from '../../core/engine/engine.service';

interface PropertyItem {
  name: string;
  value: any;
  editable?: boolean;
  type?: 'boolean' | 'number' | 'string' | 'vector';
}

interface EntityComponent {
  type: string;
  enabled: boolean;
  canToggle: boolean;
  properties: PropertyItem[];
  componentRef?: any; // Reference to actual engine component
}

interface Entity {
  id: string;
  name: string;
  components: EntityComponent[];
  entityRef?: any; // Reference to actual engine entity
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  entities: Entity[] = [];
  selectedEntity: Entity = null;
  private refreshIntervalId: ReturnType<typeof setInterval> | null = null; // TODO: Update by event system instead of interval
  private interactionPauseUntil = 0;

  constructor(private engineService: EngineService) { }

  ngOnInit(): void {
    this.refreshEntities();
    this.refreshIntervalId = setInterval(() => this.refreshEntities(), 250);
  }

  ngOnDestroy(): void {
    if (this.refreshIntervalId) {
      clearInterval(this.refreshIntervalId);
      this.refreshIntervalId = null;
    }
  }

  private refreshEntities(): void {
    if (!this.engineService.app || !this.engineService.app.world) {
      return;
    }

    if (Date.now() < this.interactionPauseUntil) {
      return;
    }

    const selectedEntityId = this.selectedEntity?.id;
    const engineEntities = this.engineService.app.world.entities;
    this.entities = engineEntities.map((entity, index) => {
      return {
        id: entity.id,
        name: entity.name || `Entity ${index + 1}`,
        components: this.mapComponents(entity),
        entityRef: entity
      };
    });

    if (selectedEntityId) {
      this.selectedEntity = this.entities.find((entity) => entity.id === selectedEntityId) || null;
    }
  }



  // TODO: Dont use any and create proper mapping between engine components and sidebar components
  private mapComponents(entity: any): EntityComponent[] {
    return entity.components.map((component: any) => {
      const componentType = component.constructor.name;
      const isScript = componentType === 'ScriptComponent';

      return {
        type: componentType,
        enabled: component.enabled !== undefined ? component.enabled : true,
        canToggle: isScript,
        properties: this.getComponentProperties(component, componentType),
        componentRef: component
      };
    });
  }

  private getComponentProperties(component: any, type: string): PropertyItem[] {
    const props: PropertyItem[] = [];

    switch (type) {
      case 'TransformComponent':
        if (component.value) {
          const pos = component.value.position;
          const rot = component.value.rotation;
          const scale = component.value.scale;
          props.push({ name: 'Position', value: `(${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)})` });
          props.push({ name: 'Rotation', value: `(${rot.x.toFixed(2)}, ${rot.y.toFixed(2)}, ${rot.z.toFixed(2)})` });
          props.push({ name: 'Scale', value: `(${scale.x.toFixed(2)}, ${scale.y.toFixed(2)}, ${scale.z.toFixed(2)})` });
        }
        break;
      
      case 'ModelComponent':
        if (component.type !== undefined) {
          props.push({ name: 'Type', value: component.type });
        }
        if (component.material) {
          props.push({ 
            name: 'Wireframe', 
            value: component.material.wireframe || false,
            editable: true,
            type: 'boolean'
          });
        }
        break;
      
      case 'CameraComponent':
        if (component.value) {
          props.push({ name: 'FOV', value: component.value.fov || 75 });
          props.push({ name: 'Near', value: component.value.near || 0.1 });
          props.push({ name: 'Far', value: component.value.far || 1000 });
        }
        break;
      
      case 'ScriptComponent':
        if (component.asset) {
          props.push({ name: 'Script', value: component.asset.name || 'Unknown' });
        }
        props.push({ name: 'Enabled', value: component.enabled });
        break;

      case 'LightComponent':
        props.push({ name: 'Type', value: component.type || 'Ambient' });
        break;

      case 'RendererComponent':
        props.push({ name: 'Active', value: component.active || false });
        break;

      case 'SceneComponent':
        props.push({ name: 'Active', value: component.active || false });
        break;
    }

    return props;
  }

  selectEntity(entity: Entity): void {
    this.selectedEntity = entity;
    this.pauseRefresh();
  }

  trackByEntityId(index: number, entity: Entity): string {
    return entity.id;
  }

  trackByComponentType(index: number, component: EntityComponent): string {
    return component.type;
  }

  trackByPropertyName(index: number, property: PropertyItem): string {
    return property.name;
  }

  pauseRefresh(durationMs: number = 600): void {
    this.interactionPauseUntil = Date.now() + durationMs;
  }

  toggleComponent(entity: Entity, component: EntityComponent): void {
    this.pauseRefresh();

    if (!component.componentRef) {
      console.warn('No component reference available');
      return;
    }

    // Toggle the enabled state on the actual engine component
    component.componentRef.enabled = component.enabled;
    this.refreshEntities();
    
    console.info(`${component.type} ${component.enabled ? 'enabled' : 'disabled'} for ${entity.name}`);
  }

  toggleProperty(entity: Entity, component: EntityComponent, property: PropertyItem): void {
    this.pauseRefresh();

    if (!component.componentRef) {
      console.warn('No component reference available');
      return;
    }

    // Handle wireframe toggle for ModelComponent
    if (component.type === 'ModelComponent' && property.name === 'Wireframe') {
      if (component.componentRef.material) {
        component.componentRef.material.wireframe = property.value;
        this.refreshEntities();
        console.info(`Wireframe ${property.value ? 'enabled' : 'disabled'} for ${entity.name}`);
      }
    }
  }
}
