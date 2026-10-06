// Generated from canonical JSON Schemas. Do not edit.

export type RequestClarificationValueV2 =
  EntitySelectionClarificationValueV2 | EntityMultiSelectionClarificationValueV2;
export type OpaqueIdentifier = string;

export interface EntitySelectionClarificationValueV2 {
  kind: 'entity_selection';
  entity_type: string;
  entity_id: OpaqueIdentifier;
  display_text?: string;
}
export interface EntityMultiSelectionClarificationValueV2 {
  kind: 'entity_multi_selection';
  entity_type: string;
  /**
   * @minItems 1
   * @maxItems 10
   */
  entity_ids:
    | [OpaqueIdentifier]
    | [OpaqueIdentifier, OpaqueIdentifier]
    | [OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier]
    | [OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier]
    | [OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier]
    | [
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier
      ]
    | [
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier
      ]
    | [
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier
      ]
    | [
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier
      ]
    | [
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier
      ];
}

/**
 * Contrato general de salida utilizado por Python/LangGraph y .NET. Representa respuestas finales, aclaraciones, confirmaciones, solicitudes de ejecución, correcciones, denegaciones, solicitudes no soportadas y errores.
 */
export type ChatTurnResponseV2 = {
  contract_version: '2.0';
  request_id: OpaqueIdentifier;
  conversation_id: OpaqueIdentifier;
  turn_id: OpaqueIdentifier;
  status:
    | 'completed'
    | 'needs_clarification'
    | 'awaiting_confirmation'
    | 'awaiting_execution'
    | 'needs_correction'
    | 'denied'
    | 'unsupported'
    | 'failed';
  message: string;
  action?:
    | ClarificationAction
    | ConfirmationAction
    | QueryExecutionAction
    | SkillExecutionAction
    | AttachmentProcessingAction
    | AnalyticsExecutionAction;
  result?:
    DataViewResult | ReportDocumentResult | NarrativeResult | OperationSummaryResult | FileResult;
  presentation?:
    | TextPresentation
    | DataGridPresentation
    | ChartPresentation
    | DataGridWithChartPresentation
    | DevexpressReportViewerPresentation
    | OperationResultPresentation;
  /**
   * @maxItems 20
   */
  available_actions?:
    | []
    | [CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ];
  error?: ErrorDetail;
  state_revision?: number;
  diagnostics?: Diagnostics;
};
export type OpaqueIdentifier = string;
export type ClarificationResponseSpec =
  | {
      type: 'text';
      required: boolean;
      allow_free_text?: boolean;
      validation?: JsonObject;
    }
  | EntitySelectionResponseSpec
  | EntityMultiSelectionResponseSpec
  | {
      type: 'single_choice';
      required: boolean;
      allow_free_text?: boolean;
      /**
       * @minItems 1
       */
      options: [ClarificationOption, ...ClarificationOption[]];
    }
  | {
      type: 'multiple_choice';
      required: boolean;
      allow_free_text?: boolean;
      /**
       * @minItems 1
       */
      options: [ClarificationOption, ...ClarificationOption[]];
    }
  | {
      type: 'date';
      required: boolean;
      allow_free_text?: boolean;
      validation?: JsonObject;
    }
  | {
      type: 'date_range';
      required: boolean;
      allow_free_text?: boolean;
      presets?: ClarificationOption[];
      validation?: JsonObject;
    }
  | {
      type: 'number';
      required: boolean;
      allow_free_text?: boolean;
      validation?: JsonObject;
    }
  | {
      type: 'boolean';
      required: boolean;
      default?: boolean;
    };
export type ParameterValue =
  | string
  | number
  | boolean
  | null
  | {
      [k: string]: any;
    }
  | any[];
export type SemanticVersion = string;

export interface ClarificationAction {
  kind: 'clarification';
  clarification_id: OpaqueIdentifier;
  field: string;
  reason_code?: string;
  question: string;
  response_spec: ClarificationResponseSpec;
}
export interface JsonObject {
  [k: string]: any;
}
export interface EntitySelectionResponseSpec {
  type: 'entity_selection';
  required: boolean;
  allow_free_text?: boolean;
  entity: {
    entity_type: string;
    search_owner: 'dotnet';
    minimum_search_length?: number;
  };
  /**
   * @minItems 1
   * @maxItems 10
   */
  options:
    | [ClarificationOption]
    | [ClarificationOption, ClarificationOption]
    | [ClarificationOption, ClarificationOption, ClarificationOption]
    | [ClarificationOption, ClarificationOption, ClarificationOption, ClarificationOption]
    | [
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption
      ]
    | [
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption
      ]
    | [
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption
      ]
    | [
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption
      ]
    | [
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption
      ]
    | [
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption
      ];
}
export interface ClarificationOption {
  id: OpaqueIdentifier;
  label: string;
  description?: string;
}
export interface EntityMultiSelectionResponseSpec {
  type: 'entity_multi_selection';
  required: boolean;
  allow_free_text?: boolean;
  entity: {
    entity_type: string;
    search_owner: 'dotnet';
    minimum_search_length?: number;
  };
  minimum_selections?: number;
  maximum_selections: number;
  /**
   * @maxItems 100
   */
  options?: ClarificationOption[];
  /**
   * @maxItems 10
   */
  selected_entity_ids?:
    | []
    | [OpaqueIdentifier]
    | [OpaqueIdentifier, OpaqueIdentifier]
    | [OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier]
    | [OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier]
    | [OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier]
    | [
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier
      ]
    | [
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier
      ]
    | [
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier
      ]
    | [
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier
      ]
    | [
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier
      ];
}
export interface ConfirmationAction {
  kind: 'confirmation';
  confirmation_id: OpaqueIdentifier;
  operation: {
    action_id: string;
    label: string;
    prepared_operation_id: OpaqueIdentifier;
  };
  summary: JsonObject;
  impact: {
    level: 'low' | 'medium' | 'high';
    sends_external_message: boolean;
    creates_data: boolean;
    updates_data: boolean;
    deletes_data: boolean;
  };
  warnings?: MessageItem[];
  response_spec: {
    type: 'confirmation';
    required: true;
    require_explicit_acceptance: true;
    /**
     * @minItems 2
     * @maxItems 2
     */
    options: never[];
  };
  expires_at: string;
}
export interface MessageItem {
  code: string;
  message: string;
}
export interface QueryExecutionAction {
  kind: 'query_execution';
  execution_id: OpaqueIdentifier;
  query: {
    dialect: 'sqlserver';
    statement: string;
    /**
     * @maxItems 200
     */
    parameters: TypedParameter[];
  };
  requirements: CapabilityRequirements;
  execution_policy: ExecutionPolicy;
  expected_result: ExpectedResult;
  presentation:
    | DataGridPresentation
    | ChartPresentation
    | DataGridWithChartPresentation
    | DevexpressReportViewerPresentation;
  continuation: Continuation;
}
export interface TypedParameter {
  name: string;
  data_type:
    | 'string'
    | 'int'
    | 'long'
    | 'decimal'
    | 'boolean'
    | 'date'
    | 'datetime'
    | 'datetime2'
    | 'guid'
    | 'json';
  value: ParameterValue;
}
export interface CapabilityRequirements {
  /**
   * @minItems 1
   */
  capabilities: [string, ...string[]];
  resource: string;
  scope_binding_required?: boolean;
}
export interface ExecutionPolicy {
  read_only: boolean;
  maximum_rows: number;
  timeout_seconds: number;
}
export interface ExpectedResult {
  kind: 'data_view' | 'report_document' | 'operation_summary' | 'file';
  shape?:
    'tabular' | 'time_series' | 'metrics' | 'financial_statement' | 'operation_summary' | 'file';
  columns?: ExpectedColumn[];
}
export interface ExpectedColumn {
  name: string;
  data_type: 'string' | 'integer' | 'decimal' | 'boolean' | 'date' | 'datetime' | 'guid';
  role?: 'identifier' | 'category' | 'measure' | 'time' | 'label' | 'metadata';
}
export interface DataGridPresentation {
  kind: 'data_grid';
  title: string;
  columns?: PresentationColumn[];
  remote_operations?: boolean;
  capabilities?: PresentationCapabilities;
}
export interface PresentationColumn {
  field: string;
  caption: string;
  data_type: 'string' | 'integer' | 'decimal' | 'boolean' | 'date' | 'datetime';
  format?: ColumnFormat;
  visible?: boolean;
  width?: number;
}
export interface ColumnFormat {
  type?: 'currency' | 'number' | 'percent' | 'date' | 'datetime' | 'text';
  currency?: string;
  precision?: number;
}
export interface PresentationCapabilities {
  allow_sorting?: boolean;
  allow_filtering?: boolean;
  allow_grouping?: boolean;
  allow_column_chooser?: boolean;
  allow_search?: boolean;
  allow_paging?: boolean;
  allow_print?: boolean;
  allow_export?: boolean;
  export_formats?: ('xlsx' | 'pdf' | 'png' | 'csv')[];
}
export interface ChartPresentation {
  kind: 'chart';
  title: string;
  chart: ChartDefinition;
  capabilities?: PresentationCapabilities;
}
export interface ChartDefinition {
  type: 'bar' | 'column' | 'line' | 'area' | 'pie' | 'donut';
  category_field: string;
  /**
   * @minItems 1
   */
  series: [ChartSeries, ...ChartSeries[]];
}
export interface ChartSeries {
  field: string;
  label: string;
}
export interface DataGridWithChartPresentation {
  kind: 'data_grid_with_chart';
  title: string;
  columns?: PresentationColumn[];
  grid?: {
    columns?: PresentationColumn[];
  };
  chart: ChartDefinition;
  remote_operations?: boolean;
  capabilities?: PresentationCapabilities;
}
export interface DevexpressReportViewerPresentation {
  kind: 'devexpress_report_viewer';
  title: string;
  capabilities?: PresentationCapabilities;
}
export interface Continuation {
  mode: 'render_only' | 'narrative' | 'python_analysis';
  result_payload?: 'metadata_only' | 'aggregates_and_preview' | 'bounded_dataset';
  maximum_preview_rows?: number;
  maximum_rows?: number;
  analysis_operation?: string;
}
export interface SkillExecutionAction {
  kind: 'skill_execution';
  execution_id: OpaqueIdentifier;
  skill_id: string;
  skill_version: SemanticVersion;
  parameters: JsonObject;
  requirements: CapabilityRequirements;
  expected_result: ExpectedResult;
  presentation:
    | DataGridPresentation
    | ChartPresentation
    | DataGridWithChartPresentation
    | DevexpressReportViewerPresentation
    | OperationResultPresentation;
  continuation: Continuation;
}
export interface OperationResultPresentation {
  kind: 'operation_result';
  title: string;
  sections?: ('summary' | 'issues' | 'file')[];
  grid?: {
    columns?: PresentationColumn[];
  };
  capabilities?: PresentationCapabilities;
}
export interface AttachmentProcessingAction {
  kind: 'attachment_processing';
  execution_id: OpaqueIdentifier;
  operation: string;
  /**
   * @minItems 1
   * @maxItems 20
   */
  attachments:
    | [AttachmentBinding]
    | [AttachmentBinding, AttachmentBinding]
    | [AttachmentBinding, AttachmentBinding, AttachmentBinding]
    | [AttachmentBinding, AttachmentBinding, AttachmentBinding, AttachmentBinding]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ];
  processing: {
    mode:
      | 'structured_import_validation'
      | 'document_data_extraction'
      | 'image_data_extraction'
      | 'document_classification'
      | 'attachment_preview'
      | 'corrected_file_validation';
    expected_entity: string;
    all_or_nothing: boolean;
  };
  requirements: CapabilityRequirements;
  expected_result: ExpectedResult;
  presentation: OperationResultPresentation;
  continuation: Continuation;
}
export interface AttachmentBinding {
  attachment_id: OpaqueIdentifier;
  role: string;
}
export interface AnalyticsExecutionAction {
  kind: 'analytics_execution';
  execution_id: OpaqueIdentifier;
  analytics: {
    operation_id: string;
    operation_version: SemanticVersion;
    parameters: JsonObject;
  };
  data_request: {
    kind: 'query_execution';
    dataset_id: string;
    /**
     * @minItems 1
     */
    required_fields: [ExpectedColumn, ...ExpectedColumn[]];
    period?: {
      start_date: string;
      end_date_exclusive: string;
    };
    granularity?: 'day' | 'week' | 'month' | 'quarter' | 'year';
    filters?: JsonObject;
  };
  requirements: CapabilityRequirements;
  execution_policy: ExecutionPolicy;
  expected_result: ExpectedResult;
  presentation: DataGridPresentation | ChartPresentation | DataGridWithChartPresentation;
  continuation: Continuation & {
    mode: 'python_analysis';
    result_payload: 'bounded_dataset';
    [k: string]: any;
  };
}
export interface DataViewResult {
  kind: 'data_view';
  result_id: OpaqueIdentifier;
  execution_id?: OpaqueIdentifier;
  data:
    | {
        mode: 'inline';
        rows: {
          [k: string]: any;
        }[];
        total_count: number;
      }
    | {
        mode: 'remote';
        total_count: number;
      };
  summary?: JsonObject;
  narrative?: string;
}
export interface ReportDocumentResult {
  kind: 'report_document';
  report_id: OpaqueIdentifier;
  report_reference: string;
  execution_id?: OpaqueIdentifier;
}
export interface NarrativeResult {
  kind: 'narrative';
  content: string;
}
export interface OperationSummaryResult {
  kind: 'operation_summary';
  operation: string;
  execution_id?: OpaqueIdentifier;
  summary: JsonObject;
  issues?: IssueItem[];
}
export interface IssueItem {
  row_number?: number;
  column?: string | null;
  value?: any;
  code: string;
  message: string;
}
export interface FileResult {
  kind: 'file';
  file_id: OpaqueIdentifier;
  name: string;
  mime_type: string;
}
export interface TextPresentation {
  kind: 'text';
  title?: string;
}
export interface CreateSavedReportAvailableAction {
  kind: 'create_saved_report';
  action_id: 'reports.saved.create';
  label: 'Agregar al menú como reporte recurrente';
  source_execution_id: OpaqueIdentifier;
  source_result_id: OpaqueIdentifier;
  requires_confirmation: true;
  defaults?: {
    name?: string;
    menu_group?: string;
    presentation_kind?: 'data_grid' | 'data_grid_with_chart';
  };
  parameter_definitions?: ParameterDefinition[];
}
export interface ParameterDefinition {
  name: string;
  label: string;
  data_type:
    'string' | 'number' | 'integer' | 'boolean' | 'date' | 'date_range' | 'entity_selection';
  required: boolean;
}
export interface ReplaceAttachmentAvailableAction {
  kind: 'replace_attachment';
  action_id: 'attachments.replace';
  label: string;
  source_execution_id: OpaqueIdentifier;
  /**
   * @minItems 1
   */
  accepted_mime_types: [string, ...string[]];
}
export interface ErrorDetail {
  code: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  retryable: boolean;
  correlation_id?: OpaqueIdentifier;
  details?: MessageItem[];
}
export interface Diagnostics {
  graph_run_id?: OpaqueIdentifier;
  retrieval_count?: number;
  warnings?: MessageItem[];
}

export type LabelFormat = 'auto' | 'date' | 'month_short' | 'month_year' | 'category';
export type Title = string | null;
export type Format = 'auto' | 'number' | 'integer' | 'currency' | 'percent';
export type Scale = 'linear' | 'logarithmic';
export type Title1 = string | null;
export type ZeroBaseline = 'required' | 'optional' | 'suppressed';
export type CategoryField = string;
export type ChartDefinitionVersion = '2.0';
export type MaxCategories = number;
export type MaxSeries = number;
export type Overflow = 'degrade';
/**
 * @minItems 1
 * @maxItems 8
 */
export type MeasureFields =
  | [string]
  | [string, string]
  | [string, string, string]
  | [string, string, string, string]
  | [string, string, string, string, string]
  | [string, string, string, string, string, string]
  | [string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string];
export type Orientation = ('horizontal' | 'vertical') | null;
export type SeriesGroupField = string | null;
export type SeriesMode = 'fields' | 'grouped';
export type Direction = 'ascending' | 'descending';
export type Field = string;
export type Nulls = 'first' | 'last';
export type Stacking = 'none' | 'normal' | 'percent';
export type Title2 = string;
export type Type = 'bar' | 'column' | 'line' | 'area' | 'pie' | 'donut';

/**
 * Contrato normativo runtime chart-definition versión 2.
 */
export interface ChartDefinitionV2 {
  axis: ChartAxisV1;
  category_field: CategoryField;
  chart_definition_version: ChartDefinitionVersion;
  limit: ChartLimitV1;
  measure_fields: MeasureFields;
  orientation: Orientation;
  series_group_field: SeriesGroupField;
  series_mode: SeriesMode;
  sort: ChartSortV1 | null;
  stacking: Stacking;
  title: Title2;
  type: Type;
}
export interface ChartAxisV1 {
  category: ChartCategoryAxisV1;
  value: ChartValueAxisV1;
}
export interface ChartCategoryAxisV1 {
  label_format: LabelFormat;
  title: Title;
}
export interface ChartValueAxisV1 {
  format: Format;
  scale: Scale;
  title: Title1;
  zero_baseline: ZeroBaseline;
}
export interface ChartLimitV1 {
  max_categories: MaxCategories;
  max_series: MaxSeries;
  overflow: Overflow;
}
export interface ChartSortV1 {
  direction: Direction;
  field: Field;
  nulls: Nulls;
}

export type AnalysisIntent =
  | (
      | 'none'
      | 'identify_highest'
      | 'identify_lowest'
      | 'compare'
      | 'describe_distribution'
      | 'analyze_trend'
    )
  | null;
export type Confidence = number;
export type Intent =
  | 'chat'
  | 'query'
  | 'skill'
  | 'attachment'
  | 'analytics'
  | 'deny'
  | 'unsupported'
  | 'clarification';
export type IntentClassificationVersion = '2.0';
export type IsErpRelated = boolean;
/**
 * @maxItems 20
 */
export type MissingInformation =
  | []
  | [
      | 'query_type'
      | 'period'
      | 'metric'
      | 'filters'
      | 'grouping'
      | 'entity'
      | 'operation'
      | 'attachment_purpose'
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ];
export type Mode = 'auto' | 'include' | 'only';
export type PresentationPreferenceVersion = '1.0';
/**
 * @maxItems 6
 */
export type Required =
  | []
  | ['kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge']
  | [
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge'
    ]
  | [
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge'
    ]
  | [
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge'
    ]
  | [
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge'
    ]
  | [
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge'
    ];
export type Reason =
  | 'erp_general'
  | 'erp_data_query'
  | 'erp_operation'
  | 'erp_attachment'
  | 'erp_analytics'
  | 'out_of_domain'
  | 'erp_unsupported'
  | 'ambiguous';
export type RequiresClarification = boolean;
export type TaskKind =
  | (
      | 'scalar'
      | 'detail'
      | 'grouped_aggregate'
      | 'ranking'
      | 'comparison'
      | 'distribution'
      | 'trend'
    )
  | null;
export type EntityValueSource = ('entity_id' | 'binding_value') | null;
export type Name = string;
export type Nullable = boolean;
export type SqlType = 'bit';
export type Value = boolean | null;
export type EntityValueSource1 = ('entity_id' | 'binding_value') | null;
export type Name1 = string;
export type Nullable1 = boolean;
export type SqlType1 = 'tinyint' | 'smallint' | 'int' | 'bigint';
export type Value1 = number | null;
export type EntityValueSource2 = ('entity_id' | 'binding_value') | null;
export type Name2 = string;
export type Nullable2 = boolean;
export type Precision = number;
export type Scale = number;
export type SqlType2 = 'decimal';
export type Value2 = string | null;
export type EntityValueSource3 = ('entity_id' | 'binding_value') | null;
export type Name3 = string;
export type Nullable3 = boolean;
export type SqlType3 = 'date';
export type Value3 = string | null;
export type EntityValueSource4 = ('entity_id' | 'binding_value') | null;
export type Name4 = string;
export type Nullable4 = boolean;
export type SqlType4 = 'datetime2';
export type Value4 = string | null;
export type EntityValueSource5 = ('entity_id' | 'binding_value') | null;
export type Name5 = string;
export type Nullable5 = boolean;
export type SqlType5 = 'uniqueidentifier';
export type Value5 = string | null;
export type EntityValueSource6 = ('entity_id' | 'binding_value') | null;
export type MaxLength = number;
export type Name6 = string;
export type Nullable6 = boolean;
export type SqlType6 = 'nvarchar';
export type Value6 = string | null;
/**
 * @maxItems 200
 */
export type Parameters = (
  | BitParameterDraftV2
  | IntegerParameterDraftV2
  | DecimalParameterDraftV2
  | DateParameterDraftV2
  | DateTimeParameterDraftV2
  | UniqueIdentifierParameterDraftV2
  | NVarCharParameterDraftV2
)[];
/**
 * @minItems 1
 * @maxItems 20
 */
export type Blocks =
  | [
      | KpiBlockV1
      | ComparisonKpiBlockV1
      | DataGridBlockV1
      | PivotGridBlockV1
      | ChartBlockV1
      | GaugeBlockV1
    ]
  | [
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      )
    ]
  | [
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      )
    ]
  | [
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      )
    ]
  | [
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      )
    ]
  | [
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      )
    ]
  | [
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      )
    ]
  | [
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      )
    ]
  | [
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      )
    ]
  | [
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      )
    ]
  | [
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      )
    ]
  | [
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      )
    ]
  | [
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      )
    ]
  | [
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      )
    ]
  | [
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      )
    ]
  | [
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      )
    ]
  | [
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      )
    ]
  | [
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      )
    ]
  | [
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      )
    ]
  | [
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      ),
      (
        | KpiBlockV1
        | ComparisonKpiBlockV1
        | DataGridBlockV1
        | PivotGridBlockV1
        | ChartBlockV1
        | GaugeBlockV1
      )
    ];
export type BlockId = string;
export type BlockVersion = '1.0';
export type Format = 'auto' | 'number' | 'integer' | 'currency' | 'percent';
export type Kind = 'kpi';
export type Title = string;
export type Value7 =
  FieldValueReferenceV1 | ResultAggregateValueReferenceV1 | ResolvedReferenceValueReferenceV1;
export type Field = string;
export type Source = 'field';
export type Aggregation = 'sum' | 'avg' | 'min' | 'max' | 'count';
export type Field1 = string;
export type Scope = 'result_set';
export type Source1 = 'result_aggregate';
export type ReferenceId = string;
export type Source2 = 'resolved_reference';
export type BlockId1 = string;
export type BlockVersion1 = '1.0';
export type Format1 = 'auto' | 'number' | 'integer' | 'currency' | 'percent';
export type Value8 =
  FieldValueReferenceV1 | ResultAggregateValueReferenceV1 | ResolvedReferenceValueReferenceV1;
export type Format2 = 'auto' | 'number' | 'integer' | 'currency' | 'percent';
export type Label = string;
export type Value9 =
  FieldValueReferenceV1 | ResultAggregateValueReferenceV1 | ResolvedReferenceValueReferenceV1;
export type Kind1 = 'comparison_kpi';
export type Title1 = string;
export type BlockId2 = string;
export type BlockVersion2 = '1.0';
/**
 * @maxItems 8
 */
export type Features =
  | []
  | [
      | 'sorting'
      | 'filtering'
      | 'grouping'
      | 'search'
      | 'paging'
      | 'column_chooser'
      | 'summaries'
      | 'export'
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ];
/**
 * @minItems 1
 * @maxItems 100
 */
export type Fields = [string, ...string[]];
export type Kind2 = 'data_grid';
export type Title2 = string;
export type BlockId3 = string;
export type BlockVersion3 = '1.0';
/**
 * @maxItems 20
 */
export type Columns =
  | []
  | [string]
  | [string, string]
  | [string, string, string]
  | [string, string, string, string]
  | [string, string, string, string, string]
  | [string, string, string, string, string, string]
  | [string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string, string, string, string]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ];
/**
 * @maxItems 10
 */
export type Features1 =
  | []
  | [
      | 'rows'
      | 'columns'
      | 'values'
      | 'filtering'
      | 'sorting'
      | 'totals'
      | 'subtotals'
      | 'expand_collapse'
      | 'drilldown'
      | 'export'
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ];
export type Kind3 = 'pivot_grid';
/**
 * @minItems 1
 * @maxItems 20
 */
export type Rows =
  | [string]
  | [string, string]
  | [string, string, string]
  | [string, string, string, string]
  | [string, string, string, string, string]
  | [string, string, string, string, string, string]
  | [string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string, string, string, string]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ];
export type Title3 = string;
/**
 * @minItems 1
 * @maxItems 20
 */
export type Values =
  | [PivotValueV1]
  | [PivotValueV1, PivotValueV1]
  | [PivotValueV1, PivotValueV1, PivotValueV1]
  | [PivotValueV1, PivotValueV1, PivotValueV1, PivotValueV1]
  | [PivotValueV1, PivotValueV1, PivotValueV1, PivotValueV1, PivotValueV1]
  | [PivotValueV1, PivotValueV1, PivotValueV1, PivotValueV1, PivotValueV1, PivotValueV1]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ];
export type Aggregation1 = 'sum' | 'avg' | 'min' | 'max' | 'count';
export type Field2 = string;
export type ChartBlockV1 = ChartBlockV11;
export type BlockId4 = string;
export type BlockVersion4 = '1.0';
export type CategoryField = string;
export type Family = string;
export type Kind4 = 'chart';
export type Orientation = ('vertical' | 'horizontal') | null;
/**
 * @minItems 1
 * @maxItems 20
 */
export type Series =
  | [ChartSeriesV2]
  | [ChartSeriesV2, ChartSeriesV2]
  | [ChartSeriesV2, ChartSeriesV2, ChartSeriesV2]
  | [ChartSeriesV2, ChartSeriesV2, ChartSeriesV2, ChartSeriesV2]
  | [ChartSeriesV2, ChartSeriesV2, ChartSeriesV2, ChartSeriesV2, ChartSeriesV2]
  | [ChartSeriesV2, ChartSeriesV2, ChartSeriesV2, ChartSeriesV2, ChartSeriesV2, ChartSeriesV2]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ];
export type Aggregation2 = 'none' | 'sum' | 'avg' | 'min' | 'max' | 'count';
export type Axis = string | null;
export type Field3 = string;
export type Label1 = string;
export type Type = string;
export type Title4 = string;
export type BlockId5 = string;
export type BlockVersion5 = '1.0';
export type GaugeType = 'circular' | 'linear';
export type Kind5 = 'gauge';
export type Maximum =
  | (FieldValueReferenceV1 | ResultAggregateValueReferenceV1 | ResolvedReferenceValueReferenceV1)
  | null;
export type Minimum =
  | (FieldValueReferenceV1 | ResultAggregateValueReferenceV1 | ResolvedReferenceValueReferenceV1)
  | null;
/**
 * @maxItems 20
 */
export type Ranges =
  | []
  | [GaugeRangeV1]
  | [GaugeRangeV1, GaugeRangeV1]
  | [GaugeRangeV1, GaugeRangeV1, GaugeRangeV1]
  | [GaugeRangeV1, GaugeRangeV1, GaugeRangeV1, GaugeRangeV1]
  | [GaugeRangeV1, GaugeRangeV1, GaugeRangeV1, GaugeRangeV1, GaugeRangeV1]
  | [GaugeRangeV1, GaugeRangeV1, GaugeRangeV1, GaugeRangeV1, GaugeRangeV1, GaugeRangeV1]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ];
export type End =
  FieldValueReferenceV1 | ResultAggregateValueReferenceV1 | ResolvedReferenceValueReferenceV1;
export type Label2 = string;
export type Start =
  FieldValueReferenceV1 | ResultAggregateValueReferenceV1 | ResolvedReferenceValueReferenceV1;
export type Target =
  | (FieldValueReferenceV1 | ResultAggregateValueReferenceV1 | ResolvedReferenceValueReferenceV1)
  | null;
export type Title5 = string;
export type Value10 =
  FieldValueReferenceV1 | ResultAggregateValueReferenceV1 | ResolvedReferenceValueReferenceV1;
export type CapabilityProfile = string;
export type Columns1 = number | null;
export type Mode1 = 'flow' | 'grid';
export type PresentationLayoutVersion = '1.0';
export type PresentationPlanVersion = '2.0';
export type Title6 = string;
export type Aggregation3 = 'none' | 'sum' | 'count' | 'avg' | 'min' | 'max' | 'unknown';
export type Key = string;
export type Ordinal = number;
export type PresentationSupport = boolean;
export type ProposedSemanticColumnVersion = '2.0';
export type Role = 'identifier' | 'dimension' | 'measure' | 'unknown';
export type SemanticType =
  | 'identifier'
  | 'category'
  | 'number'
  | 'currency'
  | 'percent'
  | 'date'
  | 'datetime'
  | 'boolean'
  | 'unknown';
/**
 * @maxItems 200
 */
export type Columns2 = ProposedSemanticColumnV2[];
export type PrimaryResultScopeEntity = string | null;
export type ResultSetSemanticsVersion = '1.0';
export type Selection = AllMatchesSelectionV1 | TopNSelectionV1 | SampleSelectionV1;
export type Kind6 = 'all_matches';
export type Direction = 'ascending' | 'descending';
export type Kind7 = 'top_n';
export type Limit = number;
export type OrderField = string;
/**
 * @maxItems 20
 */
export type PartitionFields =
  | []
  | [string]
  | [string, string]
  | [string, string, string]
  | [string, string, string, string]
  | [string, string, string, string, string]
  | [string, string, string, string, string, string]
  | [string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string, string, string, string]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ];
export type Scope1 = 'global' | 'per_group';
export type Kind8 = 'sample';
export type Limit1 = number;
export type Shape =
  'scalar' | 'detail' | 'grouped_aggregate' | 'ranking' | 'comparison' | 'distribution' | 'trend';
export type Version = '2.0';
export type QuerySqlDraftVersion = '6.0';
export type Sql = string;
export type ResultSetSelectionV1 = AllMatchesSelectionV1 | TopNSelectionV1 | SampleSelectionV1;
export type Entity = string;
/**
 * @minItems 1
 * @maxItems 8
 */
export type KeySemanticRoles =
  | [string]
  | [string, string]
  | [string, string, string]
  | [string, string, string, string]
  | [string, string, string, string, string]
  | [string, string, string, string, string, string]
  | [string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string];
export type ResultScopeVersion = '1.0';
export type RowCount = number;
export type SelectionKind = 'displayed_result';
export type SourceQueryExecutionId = string;
export type BindingId = 'selected_scope_entities';
export type ResultSetBindingVersion = '1.0';
export type Source3 = 'prior_result_entity_set';
export type SourceEntity = string;
/**
 * @minItems 1
 * @maxItems 8
 */
export type SourceKeySemanticRoles =
  | [string]
  | [string, string]
  | [string, string, string]
  | [string, string, string, string]
  | [string, string, string, string, string]
  | [string, string, string, string, string, string]
  | [string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string];
export type SourceQueryExecutionId1 = string;
/**
 * @minItems 1
 * @maxItems 8
 */
export type TargetSemanticRoles =
  | [string]
  | [string, string]
  | [string, string, string]
  | [string, string, string, string]
  | [string, string, string, string, string]
  | [string, string, string, string, string, string]
  | [string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string];
export type ValueReferenceV1 =
  FieldValueReferenceV1 | ResultAggregateValueReferenceV1 | ResolvedReferenceValueReferenceV1;
export type Label3 = string;
export type ReferenceId1 = string;
export type ReferenceType = 'target' | 'goal' | 'budget' | 'threshold';
export type ResolvedAt = string;
export type ResolvedBusinessReferenceVersion = '1.0';
export type SemanticType1 = 'number' | 'currency' | 'percent' | 'date' | 'datetime';
export type SourceId = string;
export type Value11 = string | number | boolean | null;
/**
 * @maxItems 50
 */
export type References = ResolvedBusinessReferenceV1[];
export type ResolvedBusinessReferenceContextVersion = '1.0';
export type PresentationBlockV2 =
  | KpiBlockV1
  | ComparisonKpiBlockV1
  | DataGridBlockV1
  | PivotGridBlockV1
  | ChartBlockV1
  | GaugeBlockV1;
export type BlockId6 = string;
export type Code =
  | (
      | 'BLOCK_FIELD_NOT_FOUND'
      | 'BLOCK_TYPE_INCOMPATIBLE'
      | 'BLOCK_AGGREGATION_UNSUPPORTED'
      | 'BLOCK_CAPABILITY_UNSUPPORTED'
      | 'BLOCK_CARDINALITY_EXCEEDED'
      | 'BLOCK_TRUNCATED_RESULT_UNSAFE'
      | 'BLOCK_REFERENCE_MISSING'
      | 'BLOCK_SCOPE_INVALID'
      | 'BLOCK_SCHEMA_INVALID'
    )
  | null;
export type Message = string | null;
export type PresentationBlockResolutionVersion = '1.0';
export type Status = 'materialized' | 'degraded';
/**
 * @maxItems 20
 */
export type Blocks1 =
  | []
  | [
      | MaterializedKpiBlockV1
      | MaterializedComparisonKpiBlockV1
      | MaterializedGridBlockV1
      | MaterializedPivotBlockV1
      | MaterializedChartBlockV1
      | MaterializedGaugeBlockV1
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedComparisonKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ];
export type BlockId7 = string;
export type BlockVersion6 = '1.0';
export type Format3 = 'auto' | 'number' | 'integer' | 'currency' | 'percent';
export type Kind9 = 'kpi';
export type Kind10 = 'all_matches' | 'top_n' | 'sample';
export type Label4 = string | null;
export type Title7 = string;
export type Value12 = string | number | boolean | null;
export type BlockId8 = string;
export type BlockVersion7 = '1.0';
export type Direction1 = 'up' | 'down' | 'flat' | 'unknown';
export type Format4 = 'auto' | 'number' | 'integer' | 'currency' | 'percent';
export type Sentiment = 'positive' | 'negative' | 'neutral' | 'unknown';
export type Value13 = string | number | boolean | null;
export type Format5 = 'auto' | 'number' | 'integer' | 'currency' | 'percent';
export type Label5 = string;
export type Value14 = string | number | boolean | null;
export type Kind11 = 'comparison_kpi';
export type Title8 = string;
export type BlockId9 = string;
export type BlockVersion8 = '1.0';
/**
 * @maxItems 8
 */
export type Features2 =
  | []
  | [
      | 'sorting'
      | 'filtering'
      | 'grouping'
      | 'search'
      | 'paging'
      | 'column_chooser'
      | 'summaries'
      | 'export'
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ];
/**
 * @minItems 1
 * @maxItems 100
 */
export type Fields1 = [string, ...string[]];
export type Kind12 = 'data_grid';
export type Title9 = string;
export type BlockId10 = string;
export type BlockVersion9 = '1.0';
export type Columns3 = string[];
/**
 * @maxItems 10
 */
export type Features3 =
  | []
  | [
      | 'rows'
      | 'columns'
      | 'values'
      | 'filtering'
      | 'sorting'
      | 'totals'
      | 'subtotals'
      | 'expand_collapse'
      | 'drilldown'
      | 'export'
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ];
export type Kind13 = 'pivot_grid';
export type Rows1 = string[];
export type Title10 = string;
/**
 * @minItems 1
 */
export type Values1 = [MaterializedPivotValueV1, ...MaterializedPivotValueV1[]];
export type Aggregation4 = 'sum' | 'avg' | 'min' | 'max' | 'count';
export type Field4 = string;
export type MaterializedChartBlockV1 = MaterializedChartBlockV11;
export type BlockId11 = string;
export type BlockVersion10 = '1.0';
export type CategoryField1 = string;
export type Family1 = string;
export type Kind14 = 'chart';
export type Orientation1 = ('vertical' | 'horizontal') | null;
/**
 * @minItems 1
 */
export type Series1 = [MaterializedChartSeriesV1, ...MaterializedChartSeriesV1[]];
export type Axis1 = string | null;
export type Field5 = string;
export type Label6 = string;
export type Type1 = string;
export type Title11 = string;
export type BlockId12 = string;
export type BlockVersion11 = '1.0';
export type GaugeType1 = 'circular' | 'linear';
export type Kind15 = 'gauge';
export type Maximum1 = string | number | boolean | null;
export type Minimum1 = string | number | boolean | null;
export type End1 = string | number | boolean | null;
export type Label7 = string;
export type Start1 = string | number | boolean | null;
export type Ranges1 = MaterializedGaugeRangeV1[];
export type Target1 = string | number | boolean | null;
export type Title12 = string;
export type Value15 = string | number | boolean | null;
export type CapabilityProfile1 = string;
export type MaterializedPresentationVersion = '2.0';
/**
 * @minItems 1
 * @maxItems 20
 */
export type Resolutions =
  | [PresentationBlockResolutionV1]
  | [PresentationBlockResolutionV1, PresentationBlockResolutionV1]
  | [PresentationBlockResolutionV1, PresentationBlockResolutionV1, PresentationBlockResolutionV1]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ];
export type Title13 = string;
export type Display = string;
export type EndExclusive = string | null;
export type Key1 = string;
export type Label8 = string;
export type Start2 = string | null;
export type Type2 = 'scalar' | 'date_range' | 'integer';
export type Value16 = string | number | boolean | null;
/**
 * @maxItems 100
 */
export type AppliedFilters = QueryAppliedFilterV2[];
export type Aggregation5 = 'none' | 'sum' | 'count' | 'avg' | 'min' | 'max' | 'unknown';
export type Currency = string | null;
export type Style = 'currency' | 'decimal' | 'percent' | 'date' | 'datetime';
export type Key2 = string;
export type Nullable7 = boolean;
export type SemanticType2 =
  | 'unknown'
  | 'identifier'
  | 'category'
  | 'number'
  | 'currency'
  | 'percent'
  | 'date'
  | 'datetime'
  | 'boolean';
export type Title14 = string;
export type Type3 =
  'string' | 'boolean' | 'date' | 'datetime' | 'integer' | 'bigint' | 'decimal' | 'number' | 'guid';
/**
 * @maxItems 200
 */
export type Columns4 = QueryResultColumnV2[];
export type AstFingerprint = string;
export type CatalogSha256 = string;
export type DurationMs = number;
export type Truncated = boolean;
export type QueryId = string;
export type QueryResultVersion = '2.0';
export type ResultFingerprint = string;
export type ResultId = string;
export type RowCount1 = number;
/**
 * @maxItems 500
 */
export type Rows2 = {
  [k: string]: string | number | boolean | null;
}[];
export type Status1 = 'completed';
export type ConversationId = string;
export type EventId = string;
export type EventVersion = '2.0';
export type RequestId = string;
export type Sequence = number;
export type Kind16 = 'result_summary';
export type SpokenSummaryVersion = '1.0';
export type Text = string;
export type Timestamp = string;
export type TurnId = string;
export type Type4 =
  | 'turn.started'
  | 'turn.progress'
  | 'assistant.delta'
  | 'heartbeat'
  | 'query.result'
  | 'analytics.result'
  | 'query.narrative_pending'
  | 'query.narrative'
  | 'query.narrative_degraded'
  | 'turn.response'
  | 'turn.error';
export type AnalyticsResultVersion = '1.0';
export type BasePeriods =
  | [AnalyticsResultPeriodV1]
  | [AnalyticsResultPeriodV1, AnalyticsResultPeriodV1]
  | [AnalyticsResultPeriodV1, AnalyticsResultPeriodV1, AnalyticsResultPeriodV1]
  | [
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1
    ]
  | [
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1
    ]
  | [
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1
    ]
  | [
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1
    ]
  | [
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1
    ]
  | [
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1
    ]
  | [
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1
    ]
  | [
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1
    ]
  | [
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1,
      AnalyticsResultPeriodV1
    ]
  | null;
export type EndExclusive1 = string;
export type Start3 = string;
export type Timezone = string;
export type DemandForecastMethodId = ('daily_run_rate_v1' | 'moving_average_v1') | null;
export type DemandForecastMethodVersion = '1.0' | null;
export type GroupBy = ('branch' | 'product') | null;
export type GroupedRows = AnalyticsResultGroupedRowV1[] | null;
export type BaseValue = string;
export type Concept = 'branch';
export type Key3 = string;
export type Label9 = string;
export type ProjectedValue = string;
export type Value17 = string;
/**
 * @maxItems 36
 */
export type InputTotals = AnalyticsResultInputTotalV1[];
export type InventoryAsOf = string | null;
export type Limitations = string[] | null;
export type Calculation =
  | (DailyRunRateCalculationV1 | NaiveLastPeriodCalculationV1 | MovingAverageCalculationV1)
  | string
  | null;
export type BaseDays = number;
export type BaseTotal = string;
export type DailyAverage = string;
export type Kind17 = 'daily_run_rate';
export type ProjectedValue1 = string;
export type TargetDays = number;
export type Kind18 = 'naive_last_period';
export type ProjectedValue2 = string;
export type SourcePeriodTotal = string;
export type Kind19 = 'moving_average';
export type PeriodCount = number;
/**
 * @minItems 1
 * @maxItems 36
 */
export type PeriodTotals = [string, ...string[]];
export type ProjectedValue3 = string;
export type Description = string;
export type Label10 = string;
export type MethodId =
  'daily_run_rate_v1' | 'naive_last_period_v1' | 'moving_average_v1' | 'inventory_reorder_v1';
export type MethodVersion = '1.0';
export type SelectionReason =
  | 'explicit_method_requested'
  | 'single_complete_base_period'
  | 'minimum_history_for_moving_average'
  | 'registered_inventory_reorder_method';
export type MethodId1 =
  'daily_run_rate_v1' | 'naive_last_period_v1' | 'moving_average_v1' | 'inventory_reorder_v1';
export type MethodVersion1 = '1.0' | null;
export type MetricConcept = 'sales' | 'purchases' | 'inventory_reorder';
export type Operation = 'forecast' | 'inventory_reorder';
export type ChartEnabled = false;
export type Kind20 = 'forecast_summary' | 'grouped_forecast' | 'inventory_reorder_grid';
export type KpiTitle = string;
export type MethodLabel = string;
export type Title15 = string;
export type ProjectedValue4 = string | null;
export type ResultId1 = string;
export type Period = string;
export type Type5 = 'actual' | 'forecast';
export type Value18 = string;
export type AvailableInventory = string | null;
export type ProductId = string;
export type ProductName = string;
export type ProjectedDemand = string;
export type RecommendedReorder = string | null;
export type RowStatus = 'ready' | 'missing_inventory';
export type Shortage = string | null;
/**
 * @maxItems 500
 */
export type Rows3 = (AnalyticsResultRowV1 | InventoryReorderResultRowV1)[];
export type Status2 = 'completed';
export type ExecutedAt = string;
export type HistoricalResultVersion = '2.0';
export type HistoricalQueryArtifactViewVersion = '1.0';
export type QueryArtifactId = string;
export type HistoricalRequeryParameterVersion = '1.0';
export type MaxLength1 = number | null;
export type Name7 = string;
export type Nullable8 = boolean;
export type Precision1 = number | null;
export type Scale1 = number | null;
export type SemanticRole = string;
export type SqlType7 =
  | 'bit'
  | 'tinyint'
  | 'smallint'
  | 'int'
  | 'bigint'
  | 'decimal'
  | 'date'
  | 'datetime2'
  | 'uniqueidentifier'
  | 'nvarchar';
/**
 * Effective value applied by the historical QueryExecution being viewed; it is not the QueryArtifactParameterV1 initial value.
 */
export type Value19 = string | number | boolean | null;
/**
 * Public projection of only the QueryArtifactParameterV1 definitions whose rebindable flag is true.
 *
 * @maxItems 200
 */
export type RequeryParameters = HistoricalRequeryParameterV1[];
export type QueryExecutionId = string;
export type Available = boolean;
export type Mode2 = 'none' | 'same_parameters' | 'rebind_parameters';
export type RebindableParameters = string[];
export type RequeryCapabilityVersion = '1.0';
export type SnapshotStatus = 'available' | 'expired' | 'unavailable';
export type HistoricalRequeryResultVersion = '2.0';
export type QueryArtifactId1 = string;
export type QueryExecutionId1 = string;
export type AstFingerprint1 = string;
export type CapabilityProfile2 = string;
export type CatalogSha2561 = string;
export type MaxLength2 = number | null;
export type Name8 = string;
export type Nullable9 = boolean;
export type Precision2 = number | null;
export type QueryArtifactParameterVersion = '1.0';
export type Rebindable = boolean;
export type Scale2 = number | null;
export type SemanticRole1 = string;
export type SqlType8 =
  | 'bit'
  | 'tinyint'
  | 'smallint'
  | 'int'
  | 'bigint'
  | 'decimal'
  | 'date'
  | 'datetime2'
  | 'uniqueidentifier'
  | 'nvarchar';
export type Value20 = string | number | boolean | null;
/**
 * @maxItems 200
 */
export type Parameters1 = QueryArtifactParameterV1[];
export type QueryArtifactId2 = string;
export type QueryArtifactVersion = '1.0';
export type Sql1 = string;
export type DashboardDefinitionVersion = '1.0';
export type DashboardId = string;
/**
 * @maxItems 20
 */
export type GlobalFilters =
  | []
  | [DashboardFilterV1]
  | [DashboardFilterV1, DashboardFilterV1]
  | [DashboardFilterV1, DashboardFilterV1, DashboardFilterV1]
  | [DashboardFilterV1, DashboardFilterV1, DashboardFilterV1, DashboardFilterV1]
  | [DashboardFilterV1, DashboardFilterV1, DashboardFilterV1, DashboardFilterV1, DashboardFilterV1]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ];
export type DashboardFilterV1 = DashboardFilterV11;
export type DashboardFilterVersion = '1.0';
export type FilterId = string;
export type Label11 = string;
export type Required1 = boolean;
export type Type6 = 'scalar' | 'date_range';
export type Columns5 = number;
export type RowHeight = number;
export type Status3 = 'draft' | 'building' | 'ready' | 'published' | 'degraded' | 'archived';
export type Title16 = string;
export type DashboardWidgetV1 = DashboardWidgetV11 & DashboardWidgetV12;
export type DashboardWidgetV11 =
  | {
      analytics_artifact_id?: null;
      query_artifact_id: string;
      [k: string]: any;
    }
  | {
      analytics_artifact_id: string;
      query_artifact_id?: null;
      [k: string]: any;
    };
export type AnalyticsArtifactId = string | null;
export type BlockId13 = string;
export type DashboardWidgetVersion = '1.0';
/**
 * @maxItems 20
 */
export type FilterBindings =
  | []
  | [DashboardFilterBindingV1]
  | [DashboardFilterBindingV1, DashboardFilterBindingV1]
  | [DashboardFilterBindingV1, DashboardFilterBindingV1, DashboardFilterBindingV1]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ];
export type DashboardFilterBindingVersion = '1.0';
export type FilterId1 = string;
/**
 * @minItems 1
 * @maxItems 10
 */
export type Mappings =
  | [DashboardFilterMappingV1]
  | [DashboardFilterMappingV1, DashboardFilterMappingV1]
  | [DashboardFilterMappingV1, DashboardFilterMappingV1, DashboardFilterMappingV1]
  | [
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1
    ]
  | [
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1
    ]
  | [
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1
    ]
  | [
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1
    ]
  | [
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1
    ]
  | [
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1
    ]
  | [
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1
    ];
export type DashboardFilterMappingV1 = DashboardFilterMappingV11;
export type DashboardFilterMappingVersion = '1.0';
export type EntityBinding = ('entity_id' | 'binding_value') | null;
export type SourcePath = 'value' | 'start' | 'end_exclusive';
export type TargetParameter = string;
export type H = number;
export type W = number;
export type X = number;
export type Y = number;
export type QueryArtifactId3 = string | null;
export type WidgetId = string;
/**
 * @maxItems 100
 */
export type Widgets = DashboardWidgetV1[];
export type EntityId = string;
export type EntityType =
  'branch' | 'customer' | 'product' | 'supplier' | 'seller' | 'document' | 'classification_level';
export type ArtifactId = string;
/**
 * @minItems 1
 */
export type Blocks2 = [DashboardEditorCatalogBlockV1, ...DashboardEditorCatalogBlockV1[]];
export type DashboardEditorBindingOptionV1 = DashboardEditorBindingOptionV11;
export type DashboardFilterId = string;
export type EntityBinding1 = ('entity_id' | 'binding_value') | null;
export type FilterLabel = string;
export type SourcePath1 = 'value' | 'start' | 'end_exclusive';
export type TargetParameter1 = string;
export type BindingOptions = DashboardEditorBindingOptionV1[];
export type BlockId14 = string;
export type DisplayTitle = string;
export type Kind21 =
  'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge' | 'table';
export type VisualType = string | null;
export type DisplayTitle1 = string;
export type SourceKind = 'query' | 'analytics';
export type Items = DashboardEditorCatalogItemV1[];
export type AnalyticsArtifactId1 = string;
/**
 * @minItems 1
 */
export type Blocks3 = [AnalyticsDashboardSourceBlockV1, ...AnalyticsDashboardSourceBlockV1[]];
export type BlockId15 = string;
export type DisplayTitle2 = string;
export type Kind22 = 'kpi' | 'chart' | 'table';
export type VisualType1 = string | null;
export type DisplayTitle3 = string;
export type SourceKind1 = 'analytics';
export type DashboardId1 = string;
export type EventId1 = string;
export type EventVersion1 = '1.0';
export type Sequence1 = number;
export type Timestamp1 = string;
export type Type7 =
  | 'dashboard.started'
  | 'dashboard.plan.updated'
  | 'dashboard.widget.started'
  | 'dashboard.widget.result'
  | 'dashboard.widget.degraded'
  | 'dashboard.widget.failed'
  | 'dashboard.completed';
export type WidgetId1 = string | null;
export type DashboardId2 = string;
export type DashboardResultVersion = '1.0';
export type Status4 = 'ready' | 'degraded' | 'failed';
export type Block =
  | (
      | MaterializedKpiBlockV1
      | MaterializedComparisonKpiBlockV1
      | MaterializedGridBlockV1
      | MaterializedPivotBlockV1
      | MaterializedChartBlockV1
      | MaterializedGaugeBlockV1
    )
  | null;
export type ErrorCode = string | null;
export type Status5 = 'completed' | 'degraded' | 'failed';
export type WidgetId2 = string;
export type Widgets1 = DashboardWidgetResultV1[];
export type ActionId = string;
export type Entity1 = string;
export type ImportOperationVersion = '1.0';
export type Operation1 = 'import';
export type PolicyId = string;
export type WriteMode = 'create' | 'update' | 'upsert';
export type AttachmentSha256 = string;
export type ImportPreflightVersion = '1.0';
export type Code1 = string;
export type ImportIssueVersion = '1.0';
export type Message1 = string;
export type Row = number | null;
export type Severity = 'warning' | 'error';
export type SourceColumn = string | null;
export type TargetField = string | null;
/**
 * @maxItems 1000
 */
export type Issues = ImportIssueV1[];
/**
 * @minItems 1
 * @maxItems 500
 */
export type Entries = [ImportMappingEntryV1, ...ImportMappingEntryV1[]];
export type Required2 = boolean;
export type SourceColumn1 = string;
export type TargetField1 = string;
export type ImportMappingVersion = '1.0';
export type MappingId = string;
export type Version1 = number;
export type PreflightId = string;
export type Columns6 = string[];
export type ImportPreviewVersion = '1.0';
export type Row1 = number;
export type Valid = boolean;
/**
 * @maxItems 100
 */
export type Rows4 = ImportPreviewRowV1[];
export type Truncated1 = boolean;
export type Status6 = 'validated' | 'awaiting_confirmation' | 'failed';
export type AttachmentSha2561 = string;
export type ConfirmationId = string | null;
export type State = 'not_required' | 'confirmed';
export type ImportExecutionRequestVersion = '1.0';
export type MappingId1 = string;
export type MappingVersion = number;
export type PolicyState = 'satisfied';
export type PreflightId1 = string;
export type AttachmentSha2562 = string;
export type ImportId = string;
export type ImportResultVersion = '1.0';
/**
 * @maxItems 1000
 */
export type Issues1 = ImportIssueV1[];
export type PreflightId2 = string;
export type Status7 =
  | 'validated'
  | 'awaiting_confirmation'
  | 'processing'
  | 'completed'
  | 'completed_with_errors'
  | 'failed'
  | 'cancelled';
export type Created = number;
export type Failed = number;
export type Received = number;
export type Skipped = number;
export type Updated = number;
export type Valid1 = number;
export type EventId2 = string;
export type EventVersion2 = '1.0';
export type ImportId1 = string;
export type PreflightId3 = string;
export type Sequence2 = number;
export type Timestamp2 = string;
export type Type8 =
  | 'import.started'
  | 'import.preflight.completed'
  | 'import.awaiting_confirmation'
  | 'import.execution.started'
  | 'import.progress'
  | 'import.completed'
  | 'import.failed';
export type Aggregations = ('sum' | 'avg' | 'min' | 'max' | 'count')[];
/**
 * @minItems 1
 * @maxItems 6
 */
export type BlockKinds =
  | ['kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge']
  | [
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge'
    ]
  | [
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge'
    ]
  | [
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge'
    ]
  | [
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge'
    ]
  | [
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'comparison_kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge'
    ];
/**
 * @minItems 1
 * @maxItems 20
 */
export type FamilySeriesCompatibility =
  | [ChartFamilySeriesCompatibilityV1]
  | [ChartFamilySeriesCompatibilityV1, ChartFamilySeriesCompatibilityV1]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ];
export type Family2 = string;
/**
 * @minItems 1
 * @maxItems 50
 */
export type SeriesTypes = [string, ...string[]];
/**
 * @maxItems 3
 */
export type Features4 =
  | []
  | ['mixed_series' | 'multiple_series' | 'multiple_axes']
  | [
      'mixed_series' | 'multiple_series' | 'multiple_axes',
      'mixed_series' | 'multiple_series' | 'multiple_axes'
    ]
  | [
      'mixed_series' | 'multiple_series' | 'multiple_axes',
      'mixed_series' | 'multiple_series' | 'multiple_axes',
      'mixed_series' | 'multiple_series' | 'multiple_axes'
    ];
/**
 * @minItems 1
 * @maxItems 2
 */
export type Orientations =
  ['vertical' | 'horizontal'] | ['vertical' | 'horizontal', 'vertical' | 'horizontal'];
/**
 * @minItems 1
 * @maxItems 3
 */
export type StackingModes =
  | ['none' | 'stacked' | 'full_stacked']
  | ['none' | 'stacked' | 'full_stacked', 'none' | 'stacked' | 'full_stacked']
  | [
      'none' | 'stacked' | 'full_stacked',
      'none' | 'stacked' | 'full_stacked',
      'none' | 'stacked' | 'full_stacked'
    ];
export type ChartFamilies = string[];
export type ChartSeriesTypes = string[];
/**
 * @maxItems 8
 */
export type Features5 =
  | []
  | [
      | 'sorting'
      | 'filtering'
      | 'grouping'
      | 'search'
      | 'paging'
      | 'column_chooser'
      | 'summaries'
      | 'export'
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ];
export type EffectivePackageVersion = string | null;
/**
 * @maxItems 2
 */
export type Features6 =
  | []
  | ['target_indicator' | 'ranges']
  | ['target_indicator' | 'ranges', 'target_indicator' | 'ranges'];
/**
 * @minItems 1
 * @maxItems 2
 */
export type Types = ['circular' | 'linear'] | ['circular' | 'linear', 'circular' | 'linear'];
export type MaxBlocks = number;
export type MaxChartCategories = number;
export type MaxChartSeries = number;
/**
 * @maxItems 10
 */
export type Features7 =
  | []
  | [
      | 'rows'
      | 'columns'
      | 'values'
      | 'filtering'
      | 'sorting'
      | 'totals'
      | 'subtotals'
      | 'expand_collapse'
      | 'drilldown'
      | 'export'
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ];
export type PresentationCapabilityProfileVersion = '1.0';
export type ProfileId = string;
export type Renderer = string | null;
export type RendererVersion = string | null;
/**
 * @minItems 1
 * @maxItems 20
 */
export type AcceptedMimeTypes =
  | [string]
  | [string, string]
  | [string, string, string]
  | [string, string, string, string]
  | [string, string, string, string, string]
  | [string, string, string, string, string, string]
  | [string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string, string, string, string]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ];
export type ActionId1 = string;
export type ConfirmationRequired = boolean;
export type ImportCapabilityDescriptorVersion = '1.0';
export type MaxBytes = number;
export type AnalyticsPresentationBlockV1 = AnalyticsPresentationBlockV11;
export type BlockId16 = string;
export type CategoryField2 = string;
export type Orientation2 = 'horizontal' | 'vertical';
/**
 * @minItems 1
 * @maxItems 1000
 */
export type Series2 = [AnalyticsChartSeriesV1, ...AnalyticsChartSeriesV1[]];
export type Field6 = string;
export type Format6 =
  ('auto' | 'number' | 'integer' | 'currency' | 'percent' | 'fraction_percent') | null;
export type Type9 = 'bar' | 'line' | 'area';
export type Kind23 = 'table' | 'kpi' | 'chart';
export type Format7 = 'auto' | 'number' | 'integer' | 'currency' | 'percent';
export type Selection1 = 'single_row';
export type ValueField = string;
export type SourceOutputId = string;
export type GenericAnalyticsPersistenceReceiptV1 = GenericAnalyticsPersistenceReceiptV11;
export type AnalyticsArtifactId2 = string;
export type AnalyticsExecutionId = string;
export type AnalyticsResultId = string | null;
export type Status8 = 'succeeded' | 'failed';
export type Version2 = '1.0';

export interface IntentClassificationV2 {
  analysis_intent?: AnalysisIntent;
  confidence: Confidence;
  intent: Intent;
  intent_classification_version: IntentClassificationVersion;
  is_erp_related: IsErpRelated;
  missing_information: MissingInformation;
  presentation_preference: PresentationPreferenceV1;
  reason: Reason;
  requires_clarification: RequiresClarification;
  task_kind?: TaskKind;
}
export interface PresentationPreferenceV1 {
  mode: Mode;
  presentation_preference_version: PresentationPreferenceVersion;
  required: Required;
}
export interface QuerySqlDraftV6 {
  parameters: Parameters;
  presentation_plan: PresentationPlanV2;
  proposed_result_semantics: ProposedResultSemanticsV2;
  query_sql_draft_version: QuerySqlDraftVersion;
  sql: Sql;
}
export interface BitParameterDraftV2 {
  entity_value_source?: EntityValueSource;
  name: Name;
  nullable: Nullable;
  sql_type: SqlType;
  value: Value;
}
export interface IntegerParameterDraftV2 {
  entity_value_source?: EntityValueSource1;
  name: Name1;
  nullable: Nullable1;
  sql_type: SqlType1;
  value: Value1;
}
export interface DecimalParameterDraftV2 {
  entity_value_source?: EntityValueSource2;
  name: Name2;
  nullable: Nullable2;
  precision: Precision;
  scale: Scale;
  sql_type: SqlType2;
  value: Value2;
}
export interface DateParameterDraftV2 {
  entity_value_source?: EntityValueSource3;
  name: Name3;
  nullable: Nullable3;
  sql_type: SqlType3;
  value: Value3;
}
export interface DateTimeParameterDraftV2 {
  entity_value_source?: EntityValueSource4;
  name: Name4;
  nullable: Nullable4;
  sql_type: SqlType4;
  value: Value4;
}
export interface UniqueIdentifierParameterDraftV2 {
  entity_value_source?: EntityValueSource5;
  name: Name5;
  nullable: Nullable5;
  sql_type: SqlType5;
  value: Value5;
}
export interface NVarCharParameterDraftV2 {
  entity_value_source?: EntityValueSource6;
  max_length: MaxLength;
  name: Name6;
  nullable: Nullable6;
  sql_type: SqlType6;
  value: Value6;
}
export interface PresentationPlanV2 {
  blocks: Blocks;
  capability_profile: CapabilityProfile;
  layout: PresentationLayoutV1;
  presentation_plan_version: PresentationPlanVersion;
  title: Title6;
}
export interface KpiBlockV1 {
  block_id: BlockId;
  block_version: BlockVersion;
  format?: Format;
  kind: Kind;
  title: Title;
  value: Value7;
}
export interface FieldValueReferenceV1 {
  field: Field;
  source: Source;
}
export interface ResultAggregateValueReferenceV1 {
  aggregation: Aggregation;
  field: Field1;
  scope: Scope;
  source: Source1;
}
export interface ResolvedReferenceValueReferenceV1 {
  reference_id: ReferenceId;
  source: Source2;
}
export interface ComparisonKpiBlockV1 {
  block_id: BlockId1;
  block_version: BlockVersion1;
  change: ComparisonKpiChangeV1;
  current: ComparisonKpiValueV1;
  kind: Kind1;
  previous: ComparisonKpiValueV1;
  title: Title1;
}
export interface ComparisonKpiChangeV1 {
  format?: Format1;
  value: Value8;
}
export interface ComparisonKpiValueV1 {
  format?: Format2;
  label: Label;
  value: Value9;
}
export interface DataGridBlockV1 {
  block_id: BlockId2;
  block_version: BlockVersion2;
  features?: Features;
  fields: Fields;
  kind: Kind2;
  title: Title2;
}
export interface PivotGridBlockV1 {
  block_id: BlockId3;
  block_version: BlockVersion3;
  columns: Columns;
  features?: Features1;
  kind: Kind3;
  rows: Rows;
  title: Title3;
  values: Values;
}
export interface PivotValueV1 {
  aggregation: Aggregation1;
  field: Field2;
}
export interface ChartBlockV11 {
  block_id: BlockId4;
  block_version: BlockVersion4;
  category_field: CategoryField;
  family: Family;
  kind: Kind4;
  orientation?: Orientation;
  series: Series;
  title: Title4;
}
export interface ChartSeriesV2 {
  aggregation?: Aggregation2;
  axis?: Axis;
  field: Field3;
  label: Label1;
  type: Type;
}
export interface GaugeBlockV1 {
  block_id: BlockId5;
  block_version: BlockVersion5;
  gauge_type?: GaugeType;
  kind: Kind5;
  maximum?: Maximum;
  minimum?: Minimum;
  ranges?: Ranges;
  target?: Target;
  title: Title5;
  value: Value10;
}
export interface GaugeRangeV1 {
  end: End;
  label: Label2;
  start: Start;
}
export interface PresentationLayoutV1 {
  columns?: Columns1;
  mode: Mode1;
  presentation_layout_version: PresentationLayoutVersion;
}
export interface ProposedResultSemanticsV2 {
  columns: Columns2;
  primary_result_scope_entity?: PrimaryResultScopeEntity;
  result_set: ResultSetSemanticsV1;
  shape: Shape;
  version: Version;
}
export interface ProposedSemanticColumnV2 {
  aggregation: Aggregation3;
  key: Key;
  ordinal: Ordinal;
  presentation_support?: PresentationSupport;
  proposed_semantic_column_version: ProposedSemanticColumnVersion;
  role: Role;
  semantic_type: SemanticType;
}
export interface ResultSetSemanticsV1 {
  result_set_semantics_version: ResultSetSemanticsVersion;
  selection: Selection;
}
export interface AllMatchesSelectionV1 {
  kind: Kind6;
}
export interface TopNSelectionV1 {
  direction: Direction;
  kind: Kind7;
  limit: Limit;
  order_field: OrderField;
  partition_fields?: PartitionFields;
  scope?: Scope1;
}
export interface SampleSelectionV1 {
  kind: Kind8;
  limit: Limit1;
}
export interface ResultScopeV1 {
  entity: Entity;
  key_semantic_roles: KeySemanticRoles;
  result_scope_version: ResultScopeVersion;
  row_count: RowCount;
  selection_kind: SelectionKind;
  source_query_execution_id: SourceQueryExecutionId;
}
export interface ResultSetBindingV1 {
  binding_id: BindingId;
  result_set_binding_version: ResultSetBindingVersion;
  source: Source3;
  source_entity: SourceEntity;
  source_key_semantic_roles: SourceKeySemanticRoles;
  source_query_execution_id: SourceQueryExecutionId1;
  target_semantic_roles: TargetSemanticRoles;
}
export interface ResolvedBusinessReferenceContextV1 {
  references: References;
  resolved_business_reference_context_version: ResolvedBusinessReferenceContextVersion;
}
export interface ResolvedBusinessReferenceV1 {
  label: Label3;
  reference_id: ReferenceId1;
  reference_type: ReferenceType;
  resolved_at: ResolvedAt;
  resolved_business_reference_version: ResolvedBusinessReferenceVersion;
  semantic_type: SemanticType1;
  source_id: SourceId;
  value: Value11;
}
export interface PresentationBlockResolutionV1 {
  block_id: BlockId6;
  code?: Code;
  message?: Message;
  presentation_block_resolution_version: PresentationBlockResolutionVersion;
  status: Status;
}
export interface MaterializedPresentationV2 {
  blocks: Blocks1;
  capability_profile: CapabilityProfile1;
  layout: PresentationLayoutV1;
  materialized_presentation_version: MaterializedPresentationVersion;
  resolutions: Resolutions;
  title: Title13;
}
export interface MaterializedKpiBlockV1 {
  block_id: BlockId7;
  block_version: BlockVersion6;
  format: Format3;
  kind: Kind9;
  scope: MaterializedScopeV1;
  title: Title7;
  value: Value12;
}
export interface MaterializedScopeV1 {
  kind: Kind10;
  label?: Label4;
}
export interface MaterializedComparisonKpiBlockV1 {
  block_id: BlockId8;
  block_version: BlockVersion7;
  change: MaterializedComparisonKpiChangeV1;
  current: MaterializedComparisonKpiValueV1;
  kind: Kind11;
  previous: MaterializedComparisonKpiValueV1;
  scope: MaterializedScopeV1;
  title: Title8;
}
export interface MaterializedComparisonKpiChangeV1 {
  direction: Direction1;
  format: Format4;
  sentiment: Sentiment;
  value: Value13;
}
export interface MaterializedComparisonKpiValueV1 {
  format: Format5;
  label: Label5;
  value: Value14;
}
export interface MaterializedGridBlockV1 {
  block_id: BlockId9;
  block_version: BlockVersion8;
  features?: Features2;
  fields: Fields1;
  kind: Kind12;
  title: Title9;
}
export interface MaterializedPivotBlockV1 {
  block_id: BlockId10;
  block_version: BlockVersion9;
  columns: Columns3;
  features?: Features3;
  kind: Kind13;
  rows: Rows1;
  title: Title10;
  values: Values1;
}
export interface MaterializedPivotValueV1 {
  aggregation: Aggregation4;
  field: Field4;
}
export interface MaterializedChartBlockV11 {
  block_id: BlockId11;
  block_version: BlockVersion10;
  category_field: CategoryField1;
  family: Family1;
  kind: Kind14;
  orientation?: Orientation1;
  series: Series1;
  title: Title11;
}
export interface MaterializedChartSeriesV1 {
  axis?: Axis1;
  field: Field5;
  label: Label6;
  type: Type1;
}
export interface MaterializedGaugeBlockV1 {
  block_id: BlockId12;
  block_version: BlockVersion11;
  gauge_type?: GaugeType1;
  kind: Kind15;
  maximum?: Maximum1;
  minimum?: Minimum1;
  ranges?: Ranges1;
  target?: Target1;
  title: Title12;
  value: Value15;
}
export interface MaterializedGaugeRangeV1 {
  end: End1;
  label: Label7;
  start: Start1;
}
export interface QueryResultV2 {
  applied_filters: AppliedFilters;
  columns: Columns4;
  execution: QueryResultExecutionV2;
  presentation: MaterializedPresentationV2;
  query_id: QueryId;
  query_result_version: QueryResultVersion;
  result_fingerprint: ResultFingerprint;
  result_id: ResultId;
  row_count: RowCount1;
  rows: Rows2;
  semantics: ProposedResultSemanticsV2;
  status: Status1;
}
export interface QueryAppliedFilterV2 {
  display: Display;
  end_exclusive?: EndExclusive;
  key: Key1;
  label: Label8;
  start?: Start2;
  type: Type2;
  value?: Value16;
}
export interface QueryResultColumnV2 {
  aggregation: Aggregation5;
  format?: QueryResultFormatV2 | null;
  key: Key2;
  nullable: Nullable7;
  semantic_type: SemanticType2;
  title: Title14;
  type: Type3;
}
export interface QueryResultFormatV2 {
  currency?: Currency;
  style: Style;
}
export interface QueryResultExecutionV2 {
  ast_fingerprint: AstFingerprint;
  catalog_sha256: CatalogSha256;
  duration_ms: DurationMs;
  truncated: Truncated;
}
export interface AssistantClientStreamEventV2 {
  conversation_id: ConversationId;
  event_id: EventId;
  event_version: EventVersion;
  payload: Payload;
  request_id: RequestId;
  sequence: Sequence;
  spoken_summary?: SpokenSummaryV1 | null;
  timestamp: Timestamp;
  turn_id: TurnId;
  type: Type4;
}
export interface Payload {
  [k: string]: any;
}
export interface SpokenSummaryV1 {
  kind: Kind16;
  spoken_summary_version: SpokenSummaryVersion;
  text: Text;
}
export interface AnalyticsResultV1 {
  analytics_result_version: AnalyticsResultVersion;
  base_periods?: BasePeriods;
  demand_forecast_method_id?: DemandForecastMethodId;
  demand_forecast_method_version?: DemandForecastMethodVersion;
  group_by?: GroupBy;
  grouped_rows?: GroupedRows;
  input_totals: InputTotals;
  inventory_as_of?: InventoryAsOf;
  limitations?: Limitations;
  method_explanation?: AnalyticsMethodExplanationV1 | null;
  method_id: MethodId1;
  method_version?: MethodVersion1;
  metric_concept: MetricConcept;
  operation: Operation;
  presentation: AnalyticsResultPresentationV1;
  projected_value?: ProjectedValue4;
  result_id: ResultId1;
  rows: Rows3;
  status: Status2;
  target_period: AnalyticsResultPeriodV1;
}
export interface AnalyticsResultPeriodV1 {
  end_exclusive: EndExclusive1;
  start: Start3;
  timezone: Timezone;
}
export interface AnalyticsResultGroupedRowV1 {
  base_value: BaseValue;
  group: AnalyticsResultGroupV1;
  projected_value: ProjectedValue;
}
export interface AnalyticsResultGroupV1 {
  concept: Concept;
  key: Key3;
  label: Label9;
}
export interface AnalyticsResultInputTotalV1 {
  period: AnalyticsResultPeriodV1;
  value: Value17;
}
export interface AnalyticsMethodExplanationV1 {
  calculation?: Calculation;
  description: Description;
  label: Label10;
  method_id: MethodId;
  method_version: MethodVersion;
  selection_reason: SelectionReason;
}
export interface DailyRunRateCalculationV1 {
  base_days: BaseDays;
  base_total: BaseTotal;
  daily_average: DailyAverage;
  kind: Kind17;
  projected_value: ProjectedValue1;
  target_days: TargetDays;
}
export interface NaiveLastPeriodCalculationV1 {
  kind: Kind18;
  projected_value: ProjectedValue2;
  source_period_total: SourcePeriodTotal;
}
export interface MovingAverageCalculationV1 {
  kind: Kind19;
  period_count: PeriodCount;
  period_totals: PeriodTotals;
  projected_value: ProjectedValue3;
}
export interface AnalyticsResultPresentationV1 {
  chart_enabled: ChartEnabled;
  kind: Kind20;
  kpi_title: KpiTitle;
  method_label: MethodLabel;
  title: Title15;
}
export interface AnalyticsResultRowV1 {
  period: Period;
  type: Type5;
  value: Value18;
}
export interface InventoryReorderResultRowV1 {
  available_inventory: AvailableInventory;
  product_id: ProductId;
  product_name: ProductName;
  projected_demand: ProjectedDemand;
  recommended_reorder: RecommendedReorder;
  row_status: RowStatus;
  shortage: Shortage;
}
export interface AssistantHistoricalResultV2 {
  executed_at: ExecutedAt;
  historical_result_version: HistoricalResultVersion;
  query_artifact: HistoricalQueryArtifactViewV1 | null;
  query_execution_id: QueryExecutionId;
  requery: RequeryCapabilityV1;
  result: QueryResultV2 | null;
  snapshot_status: SnapshotStatus;
}
export interface HistoricalQueryArtifactViewV1 {
  historical_query_artifact_view_version: HistoricalQueryArtifactViewVersion;
  query_artifact_id: QueryArtifactId;
  requery_parameters: RequeryParameters;
}
export interface HistoricalRequeryParameterV1 {
  historical_requery_parameter_version: HistoricalRequeryParameterVersion;
  max_length?: MaxLength1;
  name: Name7;
  nullable: Nullable8;
  precision?: Precision1;
  scale?: Scale1;
  semantic_role: SemanticRole;
  sql_type: SqlType7;
  value?: Value19;
}
export interface RequeryCapabilityV1 {
  available: Available;
  mode: Mode2;
  rebindable_parameters: RebindableParameters;
  requery_capability_version: RequeryCapabilityVersion;
}
export interface AssistantHistoricalRequeryResultV2 {
  historical_requery_result_version: HistoricalRequeryResultVersion;
  query_artifact_id: QueryArtifactId1;
  query_execution_id: QueryExecutionId1;
  result: QueryResultV2;
}
export interface QueryArtifactV1 {
  ast_fingerprint: AstFingerprint1;
  capability_profile: CapabilityProfile2;
  catalog_sha256: CatalogSha2561;
  parameters: Parameters1;
  presentation_plan: PresentationPlanV2;
  query_artifact_id: QueryArtifactId2;
  query_artifact_version: QueryArtifactVersion;
  requery: RequeryCapabilityV1;
  result_set_binding?: ResultSetBindingV1 | null;
  semantics: ProposedResultSemanticsV2;
  sql: Sql1;
}
export interface QueryArtifactParameterV1 {
  max_length?: MaxLength2;
  name: Name8;
  nullable: Nullable9;
  precision?: Precision2;
  query_artifact_parameter_version: QueryArtifactParameterVersion;
  rebindable: Rebindable;
  scale?: Scale2;
  semantic_role: SemanticRole1;
  sql_type: SqlType8;
  value?: Value20;
}
export interface DashboardDefinitionV1 {
  dashboard_definition_version: DashboardDefinitionVersion;
  dashboard_id: DashboardId;
  global_filters: GlobalFilters;
  grid_layout: DashboardGridLayoutV1;
  status: Status3;
  title: Title16;
  widgets: Widgets;
}
export interface DashboardFilterV11 {
  dashboard_filter_version: DashboardFilterVersion;
  default_value?:
    | {
        [k: string]: any;
      }
    | number
    | string
    | boolean
    | null;
  /**
   * Canonical Entity Resolution type. Optional for historical reads; required by new entity writes. No inference.
   */
  entity_type?:
    | 'branch'
    | 'customer'
    | 'product'
    | 'supplier'
    | 'seller'
    | 'document'
    | 'classification_level'
    | null;
  filter_id: FilterId;
  impact?: 'query' | 'analysis' | 'presentation' | null;
  label: Label11;
  max_value?: number | null;
  min_value?: number | null;
  required?: Required1;
  scope?: 'data' | 'analysis' | 'presentation' | null;
  type: Type6;
  unit?: string | null;
  value_type?: 'date_range' | 'integer' | 'decimal' | 'boolean' | 'string' | 'entity' | null;
}
export interface DashboardGridLayoutV1 {
  columns: Columns5;
  row_height: RowHeight;
}
export interface DashboardWidgetV12 {
  analytics_artifact_id?: AnalyticsArtifactId;
  block_id: BlockId13;
  dashboard_widget_version: DashboardWidgetVersion;
  filter_bindings: FilterBindings;
  layout: DashboardWidgetLayoutV1;
  query_artifact_id?: QueryArtifactId3;
  widget_id: WidgetId;
}
export interface DashboardFilterBindingV1 {
  dashboard_filter_binding_version: DashboardFilterBindingVersion;
  filter_id: FilterId1;
  mappings: Mappings;
}
export interface DashboardFilterMappingV11 {
  dashboard_filter_mapping_version: DashboardFilterMappingVersion;
  entity_binding?: EntityBinding;
  source_path: SourcePath;
  target_parameter: TargetParameter;
}
export interface DashboardWidgetLayoutV1 {
  h: H;
  w: W;
  x: X;
  y: Y;
}
export interface DashboardEntitySelectionV1 {
  entity_id: EntityId;
  entity_type: EntityType;
}
export interface DashboardEditorCatalogV1 {
  items: Items;
}
export interface DashboardEditorCatalogItemV1 {
  artifact_id: ArtifactId;
  blocks: Blocks2;
  display_title: DisplayTitle1;
  source_kind: SourceKind;
}
export interface DashboardEditorCatalogBlockV1 {
  binding_options: BindingOptions;
  block_id: BlockId14;
  display_title: DisplayTitle;
  kind: Kind21;
  visual_type?: VisualType;
}
export interface DashboardEditorBindingOptionV11 {
  dashboard_filter_id: DashboardFilterId;
  entity_binding?: EntityBinding1;
  filter_label: FilterLabel;
  source_path: SourcePath1;
  target_parameter: TargetParameter1;
}
export interface AnalyticsDashboardSourceV1 {
  analytics_artifact_id: AnalyticsArtifactId1;
  blocks: Blocks3;
  display_title: DisplayTitle3;
  source_kind: SourceKind1;
}
export interface AnalyticsDashboardSourceBlockV1 {
  block_id: BlockId15;
  display_title: DisplayTitle2;
  kind: Kind22;
  visual_type?: VisualType1;
}
export interface DashboardStreamEventV1 {
  dashboard_id: DashboardId1;
  event_id: EventId1;
  event_version: EventVersion1;
  payload: Payload1;
  sequence: Sequence1;
  timestamp: Timestamp1;
  type: Type7;
  widget_id?: WidgetId1;
}
export interface Payload1 {
  [k: string]: any;
}
export interface DashboardResultV1 {
  dashboard_id: DashboardId2;
  dashboard_result_version: DashboardResultVersion;
  status: Status4;
  widgets: Widgets1;
}
export interface DashboardWidgetResultV1 {
  block?: Block;
  error_code?: ErrorCode;
  status: Status5;
  widget_id: WidgetId2;
}
export interface ImportOperationV1 {
  action_id: ActionId;
  entity: Entity1;
  import_operation_version: ImportOperationVersion;
  operation: Operation1;
  policy_id: PolicyId;
  write_mode: WriteMode;
}
export interface ImportPreflightV1 {
  attachment_sha256: AttachmentSha256;
  import_preflight_version: ImportPreflightVersion;
  issues: Issues;
  mapping: ImportMappingV1;
  operation: ImportOperationV1;
  preflight_id: PreflightId;
  preview: ImportPreviewV1;
  status: Status6;
}
export interface ImportIssueV1 {
  code: Code1;
  import_issue_version: ImportIssueVersion;
  message: Message1;
  row?: Row;
  severity: Severity;
  source_column?: SourceColumn;
  target_field?: TargetField;
}
export interface ImportMappingV1 {
  entries: Entries;
  import_mapping_version: ImportMappingVersion;
  mapping_id: MappingId;
  version: Version1;
}
export interface ImportMappingEntryV1 {
  required: Required2;
  source_column: SourceColumn1;
  target_field: TargetField1;
}
export interface ImportPreviewV1 {
  columns: Columns6;
  import_preview_version: ImportPreviewVersion;
  rows: Rows4;
  truncated: Truncated1;
}
export interface ImportPreviewRowV1 {
  row: Row1;
  valid: Valid;
  values: Values2;
}
export interface Values2 {
  [k: string]: string | number | boolean | null;
}
export interface ImportExecutionRequestV1 {
  attachment_sha256: AttachmentSha2561;
  confirmation: ImportConfirmationV1;
  import_execution_request_version: ImportExecutionRequestVersion;
  mapping_id: MappingId1;
  mapping_version: MappingVersion;
  operation: ImportOperationV1;
  policy_state: PolicyState;
  preflight_id: PreflightId1;
}
export interface ImportConfirmationV1 {
  confirmation_id?: ConfirmationId;
  state: State;
}
export interface ImportResultV1 {
  attachment_sha256: AttachmentSha2562;
  import_id: ImportId;
  import_result_version: ImportResultVersion;
  issues: Issues1;
  preflight_id: PreflightId2;
  status: Status7;
  summary: ImportCountSummaryV1;
}
export interface ImportCountSummaryV1 {
  created: Created;
  failed: Failed;
  received: Received;
  skipped: Skipped;
  updated: Updated;
  valid: Valid1;
}
export interface ImportStreamEventV1 {
  event_id: EventId2;
  event_version: EventVersion2;
  import_id: ImportId1;
  payload: Payload2;
  preflight_id: PreflightId3;
  sequence: Sequence2;
  timestamp: Timestamp2;
  type: Type8;
}
export interface Payload2 {
  [k: string]: any;
}
export interface PresentationCapabilityProfileV1 {
  aggregations: Aggregations;
  block_kinds: BlockKinds;
  chart?: ChartCapabilitiesV1 | null;
  chart_families: ChartFamilies;
  chart_series_types: ChartSeriesTypes;
  data_grid?: DataGridCapabilitiesV1 | null;
  effective_package_version?: EffectivePackageVersion;
  gauge?: GaugeCapabilitiesV1 | null;
  max_blocks: MaxBlocks;
  max_chart_categories: MaxChartCategories;
  max_chart_series: MaxChartSeries;
  pivot_grid?: PivotGridCapabilitiesV1 | null;
  presentation_capability_profile_version: PresentationCapabilityProfileVersion;
  profile_id: ProfileId;
  renderer?: Renderer;
  renderer_version?: RendererVersion;
}
export interface ChartCapabilitiesV1 {
  family_series_compatibility: FamilySeriesCompatibility;
  features: Features4;
  orientations: Orientations;
  stacking_modes: StackingModes;
}
export interface ChartFamilySeriesCompatibilityV1 {
  family: Family2;
  series_types: SeriesTypes;
}
export interface DataGridCapabilitiesV1 {
  features: Features5;
}
export interface GaugeCapabilitiesV1 {
  features: Features6;
  types: Types;
}
export interface PivotGridCapabilitiesV1 {
  features: Features7;
}
export interface ImportCapabilityDescriptorV1 {
  accepted_mime_types: AcceptedMimeTypes;
  action_id: ActionId1;
  confirmation_required: ConfirmationRequired;
  import_capability_descriptor_version: ImportCapabilityDescriptorVersion;
  max_bytes: MaxBytes;
  operation: ImportOperationV1;
}
export interface AnalyticsPresentationBlockV11 {
  block_id: BlockId16;
  chart?: AnalyticsChartPresentationV1 | null;
  kind: Kind23;
  kpi?: AnalyticsKpiPresentationV1 | null;
  source_output_id: SourceOutputId;
}
export interface AnalyticsChartPresentationV1 {
  category_field: CategoryField2;
  orientation: Orientation2;
  series: Series2;
  type: Type9;
}
export interface AnalyticsChartSeriesV1 {
  field: Field6;
  format?: Format6;
}
export interface AnalyticsKpiPresentationV1 {
  format: Format7;
  selection: Selection1;
  value_field: ValueField;
}
export interface GenericAnalyticsPersistenceReceiptV11 {
  analytics_artifact_id: AnalyticsArtifactId2;
  analytics_execution_id: AnalyticsExecutionId;
  analytics_result_id: AnalyticsResultId;
  status: Status8;
  version: Version2;
}

