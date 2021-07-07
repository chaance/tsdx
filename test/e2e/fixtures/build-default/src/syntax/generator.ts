// regression test for generators
export function* testGenerator(): Generator<boolean, any, unknown> {
	return yield true;
}
