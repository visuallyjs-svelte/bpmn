<script>
    import { InspectorComponent, ColorPickerComponent, EdgeTypePickerComponent } from "@visuallyjs/browser-ui-svelte"
    import { Node, Group, Edge } from "@visuallyjs/browser-ui"
    import {
        POOL,
        LANE,
        TASK,
        GATEWAY,
        GATEWAY_TYPES,
        TASK_TYPES,
        MARKER_TYPES,
        EVENT_TYPES,
        INTERMEDIATE_EVENT, INTERMEDIATE_EVENT_TYPES,
        START_EVENT_TYPES, END_EVENT_TYPES, END_EVENT, START_EVENT
    } from "@visuallyjs/bpmn";

    function capitalise(id) {
        return id[0].toUpperCase() + id.substring(1)
    }

    function markerName(id) {
        return capitalise(id.split("-")[0])
    }

    function eventName(id) {
        return id.split("-").map(capitalise).join(" ")
    }

    const isGroup = (obj) => obj.objectType === Group.objectType;
    const isPoolOrLane =  (obj) => isGroup(obj) && (obj.type === POOL || obj.type === LANE);
    const isTask = (obj) => obj.objectType === Node.objectType && obj.type === TASK;
    const isGateway = (obj) => obj.objectType === Node.objectType && obj.type === GATEWAY
    const isEvent = (obj)  => obj.objectType === Node.objectType && EVENT_TYPES.includes(obj.type)

    let current = $state(null);
</script>

<InspectorComponent className="vjs-bpmn-inspector" bind:current={current}>
    {#if current != null}
        {#if isPoolOrLane(current)}
            <div class="vjs-inspector-section">
                <div>Title</div>
                <input type="text" vjs-att="title" vjs-focus="true" placeholder="Title"/>
            </div>

            <div class="vjs-inspector-section">
                <h4>Header</h4>
                <div>Fill</div>
                <ColorPickerComponent propertyName="headerFill"/>
                <div>Text color</div>
                <ColorPickerComponent propertyName="headerColor"/>
            </div>

            <div class="vjs-inspector-section">
                <h4>Body</h4>
                <div>Fill</div>
                <ColorPickerComponent propertyName="fill"/>
                <div>Outline</div>
                <ColorPickerComponent propertyName="outline"/>
            </div>
        {/if}

        {#if isTask(current)}
            <div class="vjs-inspector-section">
                <h4>Label</h4>
                <input type="text" vjs-att="label" vjs-focus="true" placeholder="Label"/>
            </div>

            <div class="vjs-inspector-section">
                <h3>Color</h3>
                <div>Fill</div>
                <ColorPickerComponent propertyName="fill" maxColors={3}/>
                <div>Outline</div>
                <ColorPickerComponent propertyName="outline" maxColors={3}/>
                <div>Text</div>
                <ColorPickerComponent propertyName="color" maxColors={3}/>
            </div>

            <div class="vjs-inspector-section">
                <h4>Task Type</h4>
                {#each TASK_TYPES as t}
                    <label style="display:flex; align-items:center">
                        <vjs-bpmn-icon icon-id={t} width={20} height={20}/>
                        <input type="radio" vjs-att="taskType" value={t} name="taskType" />
                        <span>{capitalise(t)}</span>
                    </label>
                {/each}
            </div>

            <div class="vjs-inspector-section">
                <h4>Markers</h4>
                {#each MARKER_TYPES as t}
                    <label style="display:flex; align-items:center">
                        <vjs-bpmn-icon icon-id={t} width={20} height={20}/>
                        <input type="checkbox" vjs-att="markers" value={t} />
                        <span>{markerName(t)}</span>
                    </label>
                {/each}
            </div>
        {/if}

        {#if isGateway(current)}
            <div class="vjs-inspector-section">
                <h4>Label</h4>
                <input type="text" vjs-att="label" vjs-focus="true" placeholder="Label"/>
            </div>
            <div class="vjs-inspector-section">
                <h3>Color</h3>
                <div>Fill</div>
                <ColorPickerComponent propertyName="fill" maxColors={3}/>
            </div>
            <div class="vjs-inspector-section">
                <h3>Type</h3>
                {#each GATEWAY_TYPES as t}
                    <label style="display:flex; align-items:center">
                        <vjs-bpmn-icon icon-id={t} width={20} height={20}/>
                        <input type="radio" vjs-att="gatewayType" value={t} name="gatewayType" />
                        <span>{capitalise(t)}</span>
                    </label>
                {/each}
            </div>
        {/if}

        {#if isEvent(current)}
            <div class="vjs-inspector-section">
                <h3>Color</h3>
                <div>Fill</div>
                <ColorPickerComponent propertyName="fill" maxColors={3}/>
                <div>Outline</div>
                <ColorPickerComponent propertyName="outline" maxColors={3}/>
            </div>
            <div class="vjs-inspector-section">
                <h3>Type</h3>
                {#if current.data.type === INTERMEDIATE_EVENT}
                    {#each INTERMEDIATE_EVENT_TYPES as t}
                        <label style="display:flex; align-items:center">
                            <vjs-bpmn-icon icon-id={t} width={20} height={20}/>
                            <input type="radio" vjs-att="eventType" name="eventType" value={t} />
                            <span>{eventName(t)}</span>
                        </label>
                    {/each}
                {/if}

                {#if current.data.type === START_EVENT}
                    {#each START_EVENT_TYPES as t}
                        <label style="display:flex; align-items:center">
                            <vjs-bpmn-icon icon-id={t} width={20} height={20}/>
                            <input type="radio" vjs-att="eventType" name="eventType" value={t} />
                            <span>{eventName(t)}</span>
                        </label>
                    {/each}
                {/if}

                {#if current.data.type === END_EVENT}
                    {#each END_EVENT_TYPES as t}
                        <label style="display:flex; align-items:center">
                            <vjs-bpmn-icon icon-id={t} width={20} height={20}/>
                            <input type="radio" vjs-att="eventType" name="eventType" value={t} />
                            <span>{eventName(t)}</span>
                        </label>
                    {/each}
                {/if}
            </div>
        {/if}

        {#if current.objectType === Edge.objectType}
            <div class="vjs-inspector-section">
                <div>Label</div>
                <input type="text" vjs-att="label"/>
            </div>
            <div class="vjs-inspector-section">
                <div>Line style</div>
                <EdgeTypePickerComponent propertyName="type"/>
            </div>
        {/if}
    {/if}
</InspectorComponent>
